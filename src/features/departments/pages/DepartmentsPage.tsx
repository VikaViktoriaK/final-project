"use client";

import Button from "@mui/material/Button";
import { CatalogPageShell } from "@/components/CatalogPageShell";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { catalogPageSx } from "@/shared/styles/catalogPage.styles";
import { DepartmentFormDialog } from "../components/DepartmentFormDialog";
import { DepartmentsFilter } from "../components/DepartmentsFilter";
import { DepartmentsTable } from "../components/DepartmentsTable";
import {
  DEPARTMENTS_CREATE_LABEL,
  DEPARTMENTS_PAGE_TITLE,
  DEPARTMENT_DELETE_DIALOG,
} from "../constants/departments.constants";
import { useDepartmentsPage } from "../hooks/useDepartmentsPage";

export function DepartmentsPage() {
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
        title={DEPARTMENTS_PAGE_TITLE}
        searchQuery={search.query}
        onSearchChange={search.setQuery}
        filter={
          <DepartmentsFilter
            order={search.order}
            onOrderChange={search.setOrder}
          />
        }
        action={
          isAdmin ? (
            <Button
              variant="text"
              sx={catalogPageSx.createButton}
              onClick={form.openCreate}
            >
              {DEPARTMENTS_CREATE_LABEL}
            </Button>
          ) : null
        }
        errorMessage={error?.message}
        loading={loading}
      >
        <DepartmentsTable
          departments={processedDepartments}
          order={search.order}
          onToggleNameSort={search.toggleOrder}
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
        title={DEPARTMENT_DELETE_DIALOG.title}
        cancelLabel={DEPARTMENT_DELETE_DIALOG.cancel}
        confirmLabel={DEPARTMENT_DELETE_DIALOG.confirm}
        deleting={deleting}
        canConfirm={Boolean(deleteDialog.target)}
        onClose={deleteDialog.close}
        onConfirm={handleDeleteConfirm}
      >
        Are you sure you want to delete department{" "}
        <strong>{deleteDialog.target?.name}</strong>?
      </ConfirmDeleteDialog>
    </>
  );
}
