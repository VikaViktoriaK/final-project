"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { useTranslation } from "@/i18n/use-translation";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { DepartmentFormDialog } from "../components/DepartmentFormDialog";
import { DepartmentsTable } from "../components/DepartmentsTable";
import { useDepartmentsPage } from "../hooks/useDepartmentsPage";

export function DepartmentsPage() {
  const { t } = useTranslation();
  const {
    isAdmin,
    loading,
    error,
    search,
    form,
    deleteDialog,
    processedDepartments,
    saving,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  } = useDepartmentsPage();

  return (
    <>
      <CatalogPageShell
        title={t("nav.departments")}
        searchQuery={search.query}
        onSearchChange={search.setQuery}
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={form.openCreate}
            >
              {t("departments.createButton")}
            </Button>
          ) : null
        }
        errorMessage={error?.message}
        loading={loading}
      >
        <DepartmentsTable
          departments={processedDepartments}
          order={search.order}
          onSort={search.toggleOrder}
          onEdit={form.openEdit}
          onDelete={deleteDialog.requestDelete}
          canManage={isAdmin}
        />
      </CatalogPageShell>

      <DepartmentFormDialog
        open={form.open}
        mode={form.mode}
        department={form.item}
        saving={saving}
        onClose={form.close}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        title={t("departments.dialog.deleteTitle")}
        cancelLabel={t("common.cancel")}
        confirmLabel={t("common.delete")}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        {t("departments.deleteConfirm")}{" "}
        <strong>{deleteDialog.target?.name}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
