import * as React from "react";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useCrudFormDialog } from "@/lib/hooks/useCrudFormDialog";
import { useDeleteConfirm } from "@/lib/hooks/useDeleteConfirm";
import { useSearchSort } from "@/lib/hooks/useSearchSort";
import {
  useCreatePositionMutation,
  useDeletePositionMutation,
  usePositionsQuery,
  useUpdatePositionMutation,
} from "../api/positions";
import type { PositionRow } from "../types";

export function usePositionsPage() {
  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const { positions, loading, error, refetch } = usePositionsQuery();
  const [createPosition, { loading: creating }] = useCreatePositionMutation();
  const [updatePosition, { loading: updating }] = useUpdatePositionMutation();
  const [deletePosition, { loading: deleting }] = useDeletePositionMutation();

  const form = useCrudFormDialog<PositionRow>();
  const deleteDialog = useDeleteConfirm<PositionRow>();
  const search = useSearchSort(positions, (item) => item.name);

  const handleFormSubmit = React.useCallback(
    async (name: string) => {
      if (form.mode === "create") {
        await createPosition({
          variables: { position: { name } },
        });
      } else if (form.item) {
        await updatePosition({
          variables: {
            position: { positionId: form.item.id, name },
          },
        });
      }
      await refetch();
    },
    [createPosition, form.item, form.mode, refetch, updatePosition],
  );

  const handleDeleteConfirm = React.useCallback(async () => {
    if (!deleteDialog.target) return;
    await deletePosition({
      variables: {
        position: { positionId: deleteDialog.target.id },
      },
    });
    deleteDialog.close();
    deleteDialog.clearTarget();
    await refetch();
  }, [deleteDialog, deletePosition, refetch]);

  return {
    isAdmin,
    loading,
    error,
    search,
    form,
    deleteDialog,
    processedPositions: search.processed,
    saving: creating || updating,
    deleting,
    handleFormSubmit,
    handleDeleteConfirm,
  };
}
