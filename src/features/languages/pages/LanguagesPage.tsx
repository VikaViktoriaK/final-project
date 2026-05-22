"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { useTranslation } from "@/i18n/use-translation";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { LanguageFormDialog } from "../components/LanguageFormDialog";
import { LanguagesTable } from "../components/LanguagesTable";
import { useLanguagesPage } from "../hooks/useLanguagesPage";

export function LanguagesPage() {
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
    processedLanguages,
    saving,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  } = useLanguagesPage();

  return (
    <>
      <CatalogPageShell
        title={t("nav.languages")}
        searchQuery={query}
        onSearchChange={setQuery}
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={form.openCreate}
            >
              {t("languages.createButton")}
            </Button>
          ) : null
        }
        errorMessage={error?.message}
        loading={loading}
      >
        <LanguagesTable
          languages={processedLanguages}
          orderBy={orderBy}
          order={order}
          onSort={handleSort}
          onEdit={form.openEdit}
          onDelete={deleteDialog.requestDelete}
          canManage={isAdmin}
        />
      </CatalogPageShell>

      <LanguageFormDialog
        open={form.open}
        mode={form.mode}
        language={form.item}
        saving={saving}
        onClose={form.close}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        title={t("languages.dialog.deleteTitle")}
        cancelLabel={t("common.cancel")}
        confirmLabel={t("common.delete")}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        {t("languages.deleteConfirm")}{" "}
        <strong>{deleteDialog.target?.name}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
