"use client";

import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { PageLoader } from "@/components/PageLoader";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
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
      <Box sx={usersTableSx.usersPageContainer}>
        <Breadcrumbs aria-label="breadcrumb" sx={usersTableSx.breadcrumbs}>
          <Typography component="span" sx={usersTableSx.breadcrumbItemActive}>
            {DEPARTMENTS_PAGE_TITLE}
          </Typography>
        </Breadcrumbs>
        <Box sx={usersTableSx.topBar}>
          <Box sx={usersTableSx.topBarSearch}>
            <UsersSearch value={search.query} onChange={search.setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <DepartmentsFilter
              order={search.order}
              onOrderChange={search.setOrder}
            />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={form.openCreate}
              >
                {DEPARTMENTS_CREATE_LABEL}
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
          <DepartmentsTable
            departments={processedDepartments}
            order={search.order}
            onToggleNameSort={search.toggleOrder}
            onEdit={form.openEdit}
            onDelete={deleteDialog.requestDelete}
            canManage={isAdmin}
          />
        )}
      </Box>

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
