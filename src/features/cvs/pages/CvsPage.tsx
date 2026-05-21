"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import useAuthErrorRedirect from "@/features/auth/hooks/use-auth-error-redirect";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import ConfirmDialog from "@/components/confirm-dialog";
import ConfirmHighlight from "@/components/confirm-highlight";
import SearchField from "@/components/search-field";
import CvsTable from "../components/list/CvsTable";
import CreateCvDialog from "../components/list/CreateCvDialog";
import useCvsPage from "../list/hooks/use-cvs-page";
import { canCreateCv, canManageCv } from "../shared/utils/cv-permissions";
import { cvsStyles } from "../styles/cvs.styles";

function CvsPage() {
  const page = useCvsPage();
  const showCreateButton = canCreateCv();

  useAuthErrorRedirect(page.error);

  if (page.loading) {
    return (
      <Box sx={cvsStyles.loadingWrap}>
        <CircularProgress />
      </Box>
    );
  }

  if (page.error) {
    return <Alert severity="error">{page.error.message}</Alert>;
  }

  return (
    <>
      <Box sx={cvsStyles.cvContentFrame}>
        <Box sx={cvsStyles.pageTopBar}>
          <Typography component="h2" sx={cvsStyles.pageTitle}>
            CVs
          </Typography>
          <Box sx={cvsStyles.pageToolbar}>
            <Box sx={cvsStyles.pageToolbarSearch}>
              <SearchField
                value={page.search}
                onChange={page.handleSearchChange}
              />
            </Box>
            {showCreateButton ? (
              <Box sx={cvsStyles.pageToolbarActions}>
                <Button
                  type="button"
                  variant="text"
                  onClick={page.openCreateDialog}
                  sx={catalogPageSx.createButton}
                >
                  + CREATE CV
                </Button>
              </Box>
            ) : null}
          </Box>
        </Box>

        {page.isEmpty && (
          <Typography sx={cvsStyles.emptyState}>No CVs found.</Typography>
        )}

        {page.isSearchEmpty && (
          <Typography sx={cvsStyles.emptyState}>
            No CVs match your search.
          </Typography>
        )}

        {page.cvs.length > 0 && (
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
        )}

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
      </Box>
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvsPage;
