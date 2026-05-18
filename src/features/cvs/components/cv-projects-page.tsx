"use client";

import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import CvSearchField from "./cv-search-field";
import CvProjectCard from "./cv-project-card";
import ProjectFormDialog from "./project-form-dialog";
import CvConfirmDialog from "./cv-confirm-dialog";
import CvConfirmHighlight from "./cv-confirm-highlight";
import useCvProjectsPage from "../hooks/use-cv-projects-page";
import { cvsStyles } from "../styles/cvs.styles";

function CvProjectsPage() {
  const page = useCvProjectsPage();
  const form = page.formDialog;

  return (
    <>
      <Box>
        <Stack direction="row" sx={cvsStyles.projectsToolbar}>
          <CvSearchField
            value={page.search}
            onChange={page.handleSearchChange}
            compact
          />
          {page.canEdit && (
            <Button
              type="button"
              onClick={page.openAddForm}
              sx={cvsStyles.createButton}
            >
              + Add project
            </Button>
          )}
        </Stack>

        {!page.isEmpty && (
          <Stack direction="row" sx={cvsStyles.projectsHeaderRow}>
            <Box sx={cvsStyles.projectHeaderName}>Name</Box>
            <Box sx={cvsStyles.projectHeaderDomain}>Domain</Box>
            <Box sx={cvsStyles.projectHeaderDate}>Start Date</Box>
            <Box sx={cvsStyles.projectHeaderDate}>End Date</Box>
            <Box sx={cvsStyles.projectHeaderActions} />
          </Stack>
        )}

        {page.isEmpty && (
          <Typography sx={cvsStyles.emptyState}>
            No projects added yet.
          </Typography>
        )}

        {page.isSearchEmpty && (
          <Typography sx={cvsStyles.emptyState}>
            No projects match your search.
          </Typography>
        )}

        {page.projects.map((project) => (
          <CvProjectCard
            key={project.id}
            project={project}
            canEdit={page.canEdit}
            onOpenMenu={page.projectMenu.open}
          />
        ))}

        <Menu
          anchorEl={page.projectMenu.anchorEl}
          open={page.projectMenu.isOpen}
          onClose={page.projectMenu.close}
        >
          <MenuItem onClick={page.openUpdateForm}>Update</MenuItem>
          <MenuItem
            onClick={page.openRemoveConfirm}
            sx={cvsStyles.menuItemDanger}
          >
            Remove
          </MenuItem>
        </Menu>

        <ProjectFormDialog
          key={form.mode === "add" ? "add-project" : page.editProjectKey}
          open={form.open}
          mode={form.mode}
          projects={form.projects}
          loading={form.loading}
          isUpdateMode={form.isUpdateMode}
          domainValue={form.domainValue}
          descriptionValue={form.descriptionValue}
          environmentValue={form.environmentValue}
          control={form.control}
          register={form.register}
          errors={form.errors}
          isSubmitting={form.isSubmitting}
          onClose={form.onClose}
          onSubmit={form.onSubmit}
        />

        <CvConfirmDialog
          open={page.removeDialog.isOpen}
          title="Remove project"
          message={
            <>
              Are you sure you want to remove project{" "}
              <CvConfirmHighlight>
                {page.removeDialog.payload?.name}
              </CvConfirmHighlight>
              ?
            </>
          }
          loading={page.mutating}
          onClose={page.removeDialog.close}
          onConfirm={page.confirmRemoveProject}
        />
      </Box>
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvProjectsPage;
