"use client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuthErrorRedirect from "@/features/auth/hooks/use-auth-error-redirect";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";
import ConfirmDialog from "@/components/confirm-dialog";
import ConfirmHighlight from "@/components/confirm-highlight";
import CvsTable from "../components/list/CvsTable";
import CreateCvDialog from "../components/list/CreateCvDialog";
import { useTranslation } from "@/i18n/use-translation";
import useCvsPage from "../list/hooks/use-cvs-page";
import { canCreateCv, canManageCv } from "../shared/utils/cv-permissions";

function CvsPage() {
  const { t } = useTranslation();
  const page = useCvsPage();
  const showCreateButton = canCreateCv();

  useAuthErrorRedirect(page.error);

  return (
    <>
      <CatalogPageShell
        title={t("nav.cvs")}
        searchQuery={page.search}
        onSearchChange={page.setSearch}
        action={
          showCreateButton ? (
            <Button
              type="button"
              variant="text"
              onClick={page.openCreateDialog}
              sx={catalogPageSx.createButton}
            >
              {t("cvs.createButton")}
            </Button>
          ) : null
        }
        errorMessage={page.error?.message}
        loading={page.loading}
      >
        {page.isEmpty ? (
          <Typography sx={catalogTableSx.emptyState}>
            {t("cvs.empty")}
          </Typography>
        ) : null}

        {page.isSearchEmpty ? (
          <Typography sx={catalogTableSx.emptyState}>
            {t("cvs.searchEmpty")}
          </Typography>
        ) : null}

        {page.cvs.length > 0 ? (
          <CvsTable
            cvs={page.cvs}
            canManageCv={canManageCv}
            sortField={page.sortField}
            sortDirection={page.sortDirection}
            onSort={page.handleSort}
            menuAnchor={page.tableMenu.anchorEl}
            editHref={page.editHref}
            onOpenMenu={page.tableMenu.open}
            onCloseMenu={page.tableMenu.close}
            onDelete={page.handleMenuDelete}
          />
        ) : null}
      </CatalogPageShell>

      <CreateCvDialog
        open={page.createDialog.isOpen}
        onClose={page.closeCreateDialog}
        register={page.createForm.register}
        errors={page.createErrors}
        isPending={page.isCreatePending}
        hasChanges={page.hasCreateChanges}
        canCreate={page.canCreate}
        errorMessage={page.createError ?? undefined}
        onSubmit={page.submitCreateCv}
      />

      <ConfirmDialog
        open={page.deleteDialog.isOpen}
        title={t("cvs.dialog.deleteTitle")}
        message={
          <>
            {t("cvs.deleteConfirm")}{" "}
            <ConfirmHighlight>
              {page.deleteDialog.payload?.name}
            </ConfirmHighlight>
            ?
          </>
        }
        confirmLabel={t("common.confirm")}
        loading={page.deleting}
        onClose={page.deleteDialog.close}
        onConfirm={page.confirmDeleteCv}
      />
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvsPage;
