"use client";

import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import useAuthErrorRedirect from "@/features/auth/hooks/use-auth-error-redirect";
import ConfirmDialog from "@/components/confirm-dialog";
import ConfirmHighlight from "@/components/confirm-highlight";
import SearchField from "@/components/search-field";
import CvsTable from "./cvs-table";
import CreateCvDialog from "./create-cv-dialog";
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
      <Box sx={cvsStyles.cvContentFrame}>
        <Box sx={cvsStyles.pageTopBar}>
          <Typography component="h2" sx={cvsStyles.pageTitle}>
            CVs
          </Typography>
          <Box sx={cvsStyles.pageToolbar}>
            <SearchField
              value={page.search}
              onChange={page.handleSearchChange}
            />
            {showCreateButton && (
              <IconButton
                type="button"
                onClick={page.openCreateDialog}
                aria-label="Create CV"
                sx={cvsStyles.createIconButton}
              >
                <Typography
                  component="span"
                  sx={cvsStyles.createIconButtonGlyph}
                >
                  +
                </Typography>
              </IconButton>
            )}
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
