import * as React from "react";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useCrudFormDialog } from "@/lib/hooks/useCrudFormDialog";
import { useDeleteConfirm } from "@/lib/hooks/useDeleteConfirm";
import { useSearchSort } from "@/lib/hooks/useSearchSort";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useDepartmentsQuery,
  useUpdateDepartmentMutation,
} from "../api/departments";
import type { DepartmentRow } from "../types";

export function useDepartmentsPage() {
  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { departments, loading, error, refetch } = useDepartmentsQuery();
  const [createDepartment, { loading: creating }] =
    useCreateDepartmentMutation();
  const [updateDepartment, { loading: updating }] =
    useUpdateDepartmentMutation();
  const [deleteDepartment, { loading: deleting }] =
    useDeleteDepartmentMutation();

  const form = useCrudFormDialog<DepartmentRow>();
  const deleteDialog = useDeleteConfirm<DepartmentRow>();
  const search = useSearchSort(departments, (item) => item.name);

  const handleFormSubmit = React.useCallback(
    async (name: string) => {
      if (form.mode === "create") {
        await createDepartment({
          variables: { department: { name } },
        });
      } else if (form.item) {
        await updateDepartment({
          variables: {
            department: { departmentId: form.item.id, name },
          },
        });
      }
      await refetch();
    },
    [createDepartment, form.item, form.mode, refetch, updateDepartment],
  );

  const handleDeleteConfirm = React.useCallback(async () => {
    if (!deleteDialog.target) return;
    await deleteDepartment({
      variables: {
        department: { departmentId: deleteDialog.target.id },
      },
    });
    deleteDialog.close();
    deleteDialog.clearTarget();
    await refetch();
  }, [deleteDepartment, deleteDialog, refetch]);

  return {
    isAdmin,
    loading,
    error,
    search,
    form,
    deleteDialog,
    processedDepartments: search.processed,
    saving: creating || updating,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  };
}
