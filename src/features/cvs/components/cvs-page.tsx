"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import useAuthErrorRedirect from "@/features/auth/hooks/use-auth-error-redirect";
import CvsTable from "./cvs-table";
import CreateCvDialog from "./create-cv-dialog";
import CvConfirmDialog from "./cv-confirm-dialog";
import CvConfirmHighlight from "./cv-confirm-highlight";
import CvSearchField from "./cv-search-field";
import useCvsPage from "../hooks/use-cvs-page";
import { canCreateCv, canManageCv } from "../utils/cv-permissions";
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
      <Box>
        <Typography component="h1" sx={cvsStyles.pageTitle}>
          CVs
        </Typography>

        <Box sx={cvsStyles.pageHeader}>
          <Box sx={cvsStyles.pageHeaderSpacer} />
          <CvSearchField
            value={page.search}
            onChange={page.handleSearchChange}
          />
          {showCreateButton && (
            <Button
              type="button"
              onClick={page.openCreateDialog}
              sx={cvsStyles.createButton}
            >
              + Create CV
            </Button>
          )}
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
          errors={page.createForm.formState.errors}
          isPending={page.createForm.formState.isSubmitting || page.creating}
          errorMessage={page.createError ?? undefined}
          onSubmit={page.submitCreateCv}
        />

        <CvConfirmDialog
          open={page.deleteDialog.isOpen}
          title="Delete CV"
          message={
            <>
              Are you sure you want to delete CV{" "}
              <CvConfirmHighlight>
                {page.deleteDialog.payload?.name}
              </CvConfirmHighlight>
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
