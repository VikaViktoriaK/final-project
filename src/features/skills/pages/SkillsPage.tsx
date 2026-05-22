"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { useTranslation } from "@/i18n/use-translation";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { SkillFormDialog } from "../components/SkillFormDialog";
import { SkillsTable } from "../components/SkillsTable";
import { useSkillsPage } from "../hooks/useSkillsPage";

export function SkillsPage() {
  const { t } = useTranslation();
  const {
    isAdmin,
    loading,
    error,
    query,
    setQuery,
    orderBy,
    order,
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
        title={t("nav.skills")}
        searchQuery={query}
        onSearchChange={setQuery}
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={form.openCreate}
            >
              {t("skills.createButton")}
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
        title={t("skills.dialog.deleteTitle")}
        cancelLabel={t("common.cancel")}
        confirmLabel={t("common.delete")}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        {t("skills.deleteConfirm")} <strong>{deleteDialog.target?.name}</strong>
        ?
      </ConfirmDeleteDialog>
    </>
  );
}
