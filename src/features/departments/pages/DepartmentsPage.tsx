"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { PageLoader } from "@/components/PageLoader";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useDepartmentsQuery,
  useUpdateDepartmentMutation,
} from "../api/departments";
import { DepartmentFormDialog } from "../components/DepartmentFormDialog";
import { DepartmentsFilter } from "../components/DepartmentsFilter";
import { DepartmentsTable } from "../components/DepartmentsTable";
import {
  DEPARTMENTS_CREATE_LABEL,
  DEPARTMENTS_PAGE_TITLE,
  DEPARTMENT_DELETE_DIALOG,
} from "../constants/departments.constants";
import type { DepartmentRow } from "../types";

export function DepartmentsPage() {
  const [query, setQuery] = React.useState("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [editingDepartment, setEditingDepartment] =
    React.useState<DepartmentRow | null>(null);
  const [deletingDepartment, setDeletingDepartment] =
    React.useState<DepartmentRow | null>(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { departments, loading, error, refetch } = useDepartmentsQuery();
  const [createDepartment, { loading: creating }] =
    useCreateDepartmentMutation();
  const [updateDepartment, { loading: updating }] =
    useUpdateDepartmentMutation();
  const [deleteDepartment, { loading: deleting }] =
    useDeleteDepartmentMutation();

  const normalize = React.useCallback(
    (value: string) => value.trim().toLowerCase(),
    [],
  );

  const processedDepartments = React.useMemo(() => {
    const q = normalize(query);
    const result = q
      ? departments.filter((item) => normalize(item.name).includes(q))
      : [...departments];

    result.sort((a, b) => {
      const aValue = normalize(a.name);
      const bValue = normalize(b.name);
      if (order === "asc") {
        return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
      }
      return bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
    });

    return result;
  }, [departments, normalize, order, query]);

  const openCreate = () => {
    setFormMode("create");
    setEditingDepartment(null);
    setFormOpen(true);
  };

  const openEdit = (department: DepartmentRow) => {
    setFormMode("edit");
    setEditingDepartment(department);
    setFormOpen(true);
  };

  const handleFormSubmit = async (name: string) => {
    if (formMode === "create") {
      await createDepartment({
        variables: { department: { name } },
      });
    } else if (editingDepartment) {
      await updateDepartment({
        variables: {
          department: { departmentId: editingDepartment.id, name },
        },
      });
    }
    await refetch();
  };

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
            <UsersSearch value={query} onChange={setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <DepartmentsFilter order={order} onOrderChange={setOrder} />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={openCreate}
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
            order={order}
            onToggleNameSort={() =>
              setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            onEdit={openEdit}
            onDelete={(department) => {
              setDeletingDepartment(department);
              setDeleteOpen(true);
            }}
            canManage={isAdmin}
          />
        )}
      </Box>

      <DepartmentFormDialog
        open={formOpen}
        mode={formMode}
        department={editingDepartment}
        saving={creating || updating}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Dialog
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        sx={usersTableSx.deleteDialogRoot}
      >
        <DialogTitle>{DEPARTMENT_DELETE_DIALOG.title}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete department{" "}
          <strong>{deletingDepartment?.name}</strong>?
        </DialogContent>
        <DialogActions sx={usersTableSx.deleteDialogActions}>
          <Button
            onClick={() => setDeleteOpen(false)}
            disabled={deleting}
            sx={usersTableSx.deleteDialogCancelBtn}
          >
            {DEPARTMENT_DELETE_DIALOG.cancel}
          </Button>
          <Button
            variant="contained"
            disabled={!deletingDepartment || deleting}
            sx={usersTableSx.deleteDialogDeleteBtn}
            onClick={async () => {
              if (!deletingDepartment) return;
              await deleteDepartment({
                variables: {
                  department: { departmentId: deletingDepartment.id },
                },
              });
              setDeleteOpen(false);
              setDeletingDepartment(null);
              await refetch();
            }}
          >
            {DEPARTMENT_DELETE_DIALOG.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
