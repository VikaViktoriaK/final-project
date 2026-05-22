"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import useAuthErrorRedirect from "@/features/auth/hooks/use-auth-error-redirect";
import { canManageProjects } from "@/features/auth/utils/permissions";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import ConfirmDialog from "@/components/confirm-dialog";
import ConfirmHighlight from "@/components/confirm-highlight";
import SortableProjectsHeader from "@/components/sortable-projects-header";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";
import CatalogProjectFormDialog from "./catalog-project-form-dialog";
import ProjectCard from "./project-card";
import { useTranslation } from "@/i18n/use-translation";
import useProjectsPage from "../hooks/use-projects-page";
import useSkillCatalog from "../hooks/use-skill-catalog";

function ProjectsPage() {
  const { t } = useTranslation();
  const page = useProjectsPage();
  const { skills: catalogSkills } = useSkillCatalog();
  const canManage = canManageProjects();

  useAuthErrorRedirect(page.error);

  return (
    <>
      <CatalogPageShell
        title={t("nav.projects")}
        searchQuery={page.search}
        onSearchChange={page.setSearch}
        action={
          canManage ? (
            <Button
              type="button"
              variant="text"
              onClick={page.openCreateDialog}
              sx={catalogPageSx.createButton}
            >
              {t("projects.createButton")}
            </Button>
          ) : null
        }
        errorMessage={page.error?.message}
        loading={page.loading}
      >
        {page.isEmpty ? (
          <Typography sx={catalogTableSx.emptyState}>
            No projects found.
          </Typography>
        ) : (
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
                    <ProjectCard
                      key={project.id}
                      project={project}
                      canManage={canManage}
                      onOpenMenu={page.projectMenu.open}
                    />
                  ))
                )}
              </Box>
            </Box>
          </Box>
        )}
      </CatalogPageShell>

      <Menu
        anchorEl={page.projectMenu.anchorEl}
        open={page.projectMenu.isOpen}
        onClose={page.projectMenu.close}
        sx={catalogTableSx.rowMenu}
      >
        <MenuItem onClick={page.openUpdateDialog}>{t("common.edit")}</MenuItem>
        <MenuItem
          onClick={page.openDeleteDialog}
          sx={catalogTableSx.rowMenuDeleteItem}
        >
          {t("common.delete")}
        </MenuItem>
      </Menu>

      <CatalogProjectFormDialog
        open={page.formDialog.open}
        mode={page.formDialog.mode}
        control={page.formDialog.control}
        register={page.formDialog.register}
        errors={page.formDialog.errors}
        skills={catalogSkills}
        isSubmitting={page.formDialog.isSubmitting}
        canSubmit={page.formDialog.canSubmit}
        onClose={page.formDialog.onClose}
        onSubmit={page.formDialog.onSubmit}
      />

      <ConfirmDialog
        open={page.deleteDialog.isOpen}
        title={t("projects.dialog.deleteTitle")}
        message={
          <>
            {t("projects.deleteConfirm")}{" "}
            <ConfirmHighlight>
              {page.deleteDialog.payload?.name}
            </ConfirmHighlight>
            ?
          </>
        }
        confirmLabel={t("common.confirm")}
        loading={page.deleteDialog.loading}
        onClose={page.deleteDialog.close}
        onConfirm={page.deleteDialog.confirm}
      />
      {page.FeedbackSnackbar}
    </>
  );
}

export default ProjectsPage;
