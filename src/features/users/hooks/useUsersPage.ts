import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useDeleteUserMutation } from "@/features/users/api/deleteUser";
import { useUsersQuery } from "@/features/users/api/getUsers";
import type { UserRow } from "@/features/users/types";
import type { UserSortField } from "@/features/users/types/usersList.types";
import { processUsers } from "@/features/users/utils/processUsers";
import { useDeleteConfirm } from "@/lib/hooks/useDeleteConfirm";
import type { SortOrder } from "@/lib/search";

export function useUsersPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [order, setOrder] = React.useState<SortOrder>("asc");
  const [orderBy, setOrderBy] = React.useState<UserSortField>("firstName");
  const [editingUser, setEditingUser] = React.useState<UserRow | null>(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);

  const { users, loading, error, refetch } = useUsersQuery();
  const [deleteUser, { loading: deleting }] = useDeleteUserMutation();
  const deleteDialog = useDeleteConfirm<UserRow>();
  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const processedUsers = React.useMemo(
    () => processUsers(users, query, orderBy, order),
    [order, orderBy, query, users],
  );

  const openCreate = React.useCallback(() => {
    setCreateOpen(true);
  }, []);

  const closeCreate = React.useCallback(() => {
    setCreateOpen(false);
  }, []);

  const openEdit = React.useCallback((user: UserRow) => {
    setEditingUser(user);
    setEditOpen(true);
  }, []);

  const closeEdit = React.useCallback(() => {
    setEditOpen(false);
  }, []);

  const viewUser = React.useCallback(
    (user: UserRow) => {
      router.push(`/users/${user.id}/profile`);
    },
    [router],
  );

  const requestDeleteUser = React.useCallback(
    (user: UserRow) => {
      if (!isAdmin) return;
      deleteDialog.requestDelete(user);
    },
    [deleteDialog, isAdmin],
  );

  const handleDeleteConfirm = React.useCallback(async () => {
    if (!deleteDialog.target) return;
    await deleteUser({ variables: { userId: deleteDialog.target.id } });
    deleteDialog.close();
    deleteDialog.clearTarget();
    await refetch();
  }, [deleteDialog, deleteUser, refetch]);

  const handleSaved = React.useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    isAdmin,
    loading,
    error,
    query,
    setQuery,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    processedUsers,
    editingUser,
    editOpen,
    openEdit,
    closeEdit,
    createOpen,
    openCreate,
    closeCreate,
    viewUser,
    requestDeleteUser,
    deleteDialog,
    deleting,
    handleDeleteConfirm,
    handleSaved,
  };
}
