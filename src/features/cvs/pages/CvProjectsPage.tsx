"use client";

import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import SortableProjectsHeader from "@/components/sortable-projects-header";
import SearchField from "@/components/search-field";
import ConfirmDialog from "@/components/confirm-dialog";
import ConfirmHighlight from "@/components/confirm-highlight";
import CvProjectCard from "../components/projects/CvProjectCard";
import ProjectFormDialog from "../components/projects/ProjectFormDialog";
import useCvProjectsPage from "../projects/hooks/use-cv-projects-page";
import { cvsStyles } from "../styles/cvs.styles";

function CvProjectsPage() {
  const page = useCvProjectsPage();
  const form = page.formDialog;

  return (
    <>
      <Box>
        <Stack direction="row" sx={cvsStyles.projectsToolbar}>
          <Box sx={cvsStyles.projectsToolbarSearch}>
            <SearchField
              value={page.search}
              onChange={page.handleSearchChange}
              compact
            />
          </Box>
          {page.canEdit && (
            <Box sx={cvsStyles.projectsToolbarActions}>
              <Button
                type="button"
                onClick={page.openAddForm}
                sx={cvsStyles.createButton}
              >
                + Add project
              </Button>
            </Box>
          )}
        </Stack>

        <Box sx={cvsStyles.projectsTableScroll}>
          <Box sx={cvsStyles.projectsTableInner}>
            <SortableProjectsHeader
              sortField={page.sortField}
              sortDirection={page.sortDirection}
              onSort={page.handleSort}
            />

            <Box sx={cvsStyles.projectsList}>
              {page.showNoResults ? (
                <Typography sx={cvsStyles.projectsEmptyResults}>
                  No results found
                </Typography>
              ) : (
                page.projects.map((project) => (
                  <CvProjectCard
                    key={project.id}
                    project={project}
                    canEdit={page.canEdit}
                    onOpenMenu={page.projectMenu.open}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>

        <Menu
          anchorEl={page.projectMenu.anchorEl}
          open={page.projectMenu.isOpen}
          onClose={page.projectMenu.close}
          slotProps={{ paper: { sx: cvsStyles.contextMenuPaper } }}
        >
          <MenuItem
            onClick={page.openUpdateForm}
            sx={cvsStyles.contextMenuItem}
          >
            Update
          </MenuItem>
          <MenuItem
            divider
            onClick={page.openRemoveConfirm}
            sx={[cvsStyles.contextMenuItem, cvsStyles.menuItemDanger]}
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
          canSubmit={form.canSubmit}
          onClose={form.onClose}
          onSubmit={form.onSubmit}
        />

        <ConfirmDialog
          open={page.removeDialog.isOpen}
          title="Remove project"
          message={
            <>
              Are you sure you want to remove project{" "}
              <ConfirmHighlight>
                {page.removeDialog.payload?.name}
              </ConfirmHighlight>
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
