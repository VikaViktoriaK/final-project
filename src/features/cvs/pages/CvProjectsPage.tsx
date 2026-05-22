"use client";

import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import SortableProjectsHeader from "@/components/sortable-projects-header";
import SearchField from "@/components/search-field";
import ConfirmDialog from "@/components/confirm-dialog";
import ConfirmHighlight from "@/components/confirm-highlight";
import CvProjectCard from "../components/projects/CvProjectCard";
import ProjectFormDialog from "../components/projects/ProjectFormDialog";
import { useTranslation } from "@/i18n/use-translation";
import useCvProjectsPage from "../projects/hooks/use-cv-projects-page";
import { cvsStyles } from "../styles/cvs.styles";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

function CvProjectsPage() {
  const { t } = useTranslation();
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
            />
          </Box>
          {page.canEdit ? (
            <Box sx={cvsStyles.projectsToolbarActions}>
              <Button
                type="button"
                variant="text"
                onClick={page.openAddForm}
                sx={catalogPageSx.createButton}
              >
                + ADD PROJECT
              </Button>
            </Box>
          ) : null}
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
          sx={catalogTableSx.rowMenu}
        >
          <MenuItem onClick={page.openUpdateForm}>{t("common.edit")}</MenuItem>
          <MenuItem
            onClick={page.openRemoveConfirm}
            sx={catalogTableSx.rowMenuDeleteItem}
          >
            {t("common.delete")}
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
