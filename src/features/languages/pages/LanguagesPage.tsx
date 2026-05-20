"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { LanguageFormDialog } from "../components/LanguageFormDialog";
import { LanguagesTable } from "../components/LanguagesTable";
import {
  LANGUAGES_CREATE_LABEL,
  LANGUAGES_PAGE_TITLE,
  LANGUAGE_DELETE_DIALOG,
} from "../constants/languages.constants";
import { useLanguagesPage } from "../hooks/useLanguagesPage";

export function LanguagesPage() {
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
        title={LANGUAGES_PAGE_TITLE}
        searchQuery={query}
        onSearchChange={setQuery}
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={form.openCreate}
            >
              {LANGUAGES_CREATE_LABEL}
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
        title={LANGUAGE_DELETE_DIALOG.title}
        cancelLabel={LANGUAGE_DELETE_DIALOG.cancel}
        confirmLabel={LANGUAGE_DELETE_DIALOG.confirm}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        Are you sure you want to delete language{" "}
        <strong>{deleteDialog.target?.name}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
