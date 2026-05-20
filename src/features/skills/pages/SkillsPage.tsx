"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
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
      <CatalogPageShell
        title={SKILLS_PAGE_TITLE}
        searchQuery={query}
        onSearchChange={setQuery}
        filter={
          <SkillsFilter
            orderBy={orderBy}
            order={order}
            onOrderByChange={setOrderBy}
            onOrderChange={setOrder}
          />
        }
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={form.openCreate}
            >
              {SKILLS_CREATE_LABEL}
            </Button>
          ) : null
        }
        errorMessage={error?.message}
        loading={loading}
      >
        <SkillsTable
          skills={processedSkills}
          orderBy={orderBy}
          order={order}
          onSort={handleSort}
          onEdit={form.openEdit}
          onDelete={deleteDialog.requestDelete}
          canManage={isAdmin}
        />
      </CatalogPageShell>

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
