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
import useCvsPage from "../list/hooks/use-cvs-page";
import { canCreateCv, canManageCv } from "../shared/utils/cv-permissions";

const CVS_PAGE_TITLE = "CVs";

function CvsPage() {
  const page = useCvsPage();
  const showCreateButton = canCreateCv();

  useAuthErrorRedirect(page.error);

  return (
    <>
      <CatalogPageShell
        title={CVS_PAGE_TITLE}
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
              + CREATE CV
            </Button>
          ) : null
        }
        errorMessage={page.error?.message}
        loading={page.loading}
      >
        {page.isEmpty ? (
          <Typography sx={catalogTableSx.emptyState}>No CVs found.</Typography>
        ) : null}

        {page.isSearchEmpty ? (
          <Typography sx={catalogTableSx.emptyState}>
            No CVs match your search.
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
        title="Delete CV"
        message={
          <>
            Are you sure you want to delete CV{" "}
            <ConfirmHighlight>
              {page.deleteDialog.payload?.name}
            </ConfirmHighlight>
            ?
          </>
        }
        confirmLabel="Confirm"
        loading={page.deleting}
        onClose={page.deleteDialog.close}
        onConfirm={page.confirmDeleteCv}
      />
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvsPage;
