"use client";

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { TableSortArrowIcon } from "@/components/app-arrow";
import CvSearchField from "./cv-search-field";
import CvProjectCard from "./cv-project-card";
import ProjectFormDialog from "./project-form-dialog";
import CvConfirmDialog from "./cv-confirm-dialog";
import CvConfirmHighlight from "./cv-confirm-highlight";
import useCvProjectsPage from "../hooks/use-cv-projects-page";
import type { ProjectSortField } from "../utils/sort-projects";
import { cvsStyles } from "../styles/cvs.styles";

type ProjectsHeaderProps = {
  sortField: ProjectSortField;
  sortDirection: "asc" | "desc";
  onSort: (field: ProjectSortField) => void;
};

function ProjectsHeader({
  sortField,
  sortDirection,
  onSort,
}: ProjectsHeaderProps) {
  const renderSortLabel = (label: string, field: ProjectSortField) => (
    <TableSortLabel
      active={sortField === field}
      direction={sortField === field ? sortDirection : "asc"}
      onClick={() => onSort(field)}
      IconComponent={TableSortArrowIcon}
      sx={cvsStyles.tableSortLabel}
    >
      {label}
    </TableSortLabel>
  );

  return (
    <Box sx={cvsStyles.projectsHeaderRow}>
      <Box sx={cvsStyles.projectGridCell}>
        {renderSortLabel("Name", "name")}
      </Box>
      <Box sx={cvsStyles.projectGridCell}>
        {renderSortLabel("Domain", "domain")}
      </Box>
      <Box sx={cvsStyles.projectGridCell}>
        {renderSortLabel("Start Date", "startDate")}
      </Box>
      <Box sx={cvsStyles.projectGridCell}>
        {renderSortLabel("End Date", "endDate")}
      </Box>
      <Box sx={cvsStyles.projectGridActions} aria-hidden />
    </Box>
  );
}

function CvProjectsPage() {
  const page = useCvProjectsPage();
  const form = page.formDialog;

  return (
    <>
      <Box>
        <Stack direction="row" sx={cvsStyles.projectsToolbar}>
          <Box sx={cvsStyles.projectsToolbarSearch}>
            <CvSearchField
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
            <ProjectsHeader
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
