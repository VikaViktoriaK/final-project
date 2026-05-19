"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { PageLoader } from "@/components/PageLoader";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import { SkillFormDialog } from "../components/SkillFormDialog";
import { SkillsFilter } from "../components/SkillsFilter";
import { SkillsTable } from "../components/SkillsTable";
import {
  SKILLS_CREATE_LABEL,
  SKILLS_PAGE_TITLE,
  SKILL_DELETE_DIALOG,
} from "../constants/skills.constants";
import { useSkillsPage } from "../hooks/useSkillsPage";

export function SkillsPage() {
  const {
    isAdmin,
    loading,
    error,
    query,
    setQuery,
    orderBy,
    setOrderBy,
    order,
    setOrder,
    handleSort,
    form,
    deleteDialog,
    categories,
    processedSkills,
    saving,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  } = useSkillsPage();

  return (
    <>
      <Box sx={usersTableSx.usersPageContainer}>
        <Breadcrumbs aria-label="breadcrumb" sx={usersTableSx.breadcrumbs}>
          <Typography component="span" sx={usersTableSx.breadcrumbItemActive}>
            {SKILLS_PAGE_TITLE}
          </Typography>
        </Breadcrumbs>
        <Box sx={usersTableSx.topBar}>
          <Box sx={usersTableSx.topBarSearch}>
            <UsersSearch value={query} onChange={setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <SkillsFilter
              orderBy={orderBy}
              order={order}
              onOrderByChange={setOrderBy}
              onOrderChange={setOrder}
            />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={form.openCreate}
              >
                {SKILLS_CREATE_LABEL}
              </Button>
            ) : null}
          </Box>
        </Box>
        {error ? (
          <Typography color="error.main">{error.message}</Typography>
        ) : null}
        {loading ? (
          <PageLoader />
        ) : (
          <SkillsTable
            skills={processedSkills}
            orderBy={orderBy}
            order={order}
            onSort={handleSort}
            onEdit={form.openEdit}
            onDelete={deleteDialog.requestDelete}
            canManage={isAdmin}
          />
        )}
      </Box>

      <SkillFormDialog
        open={form.open}
        mode={form.mode}
        skill={form.item}
        categories={categories}
        saving={saving}
        onClose={form.close}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        title={SKILL_DELETE_DIALOG.title}
        cancelLabel={SKILL_DELETE_DIALOG.cancel}
        confirmLabel={SKILL_DELETE_DIALOG.confirm}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        Are you sure you want to delete skill{" "}
        <strong>{deleteDialog.target?.name}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
