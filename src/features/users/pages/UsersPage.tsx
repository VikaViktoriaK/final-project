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
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/PageLoader";
import { UsersTable } from "@/features/users/components/UsersTable";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { UsersFilter } from "@/features/users/components/UsersFilter";
import { UserEditDialog } from "@/features/users/components/UserEditDialog";
import { UserCreateDialog } from "@/features/users/components/UserCreateDialog";
import { SidebarStub } from "@/features/users/components/SidebarStub";
import { useUsersQuery } from "@/features/users/api/getUsers";
import { useDeleteUserMutation } from "@/features/users/api/deleteUser";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import type { UserRow } from "@/features/users/types";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";

export function UsersPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof UserRow>("firstName");
  const [editingUser, setEditingUser] = React.useState<UserRow | null>(null);
  const [isEditOpen, setEditOpen] = React.useState(false);
  const [isCreateOpen, setCreateOpen] = React.useState(false);
  const [deletingUser, setDeletingUser] = React.useState<UserRow | null>(null);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);

  const { users, loading, error, refetch } = useUsersQuery();
  const [deleteUser, { loading: deleting }] = useDeleteUserMutation();
  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const normalize = React.useCallback(
    (value: string) => value.trim().toLowerCase(),
    [],
  );

  const processedUsers = React.useMemo(() => {
    let result = [...users];

    const q = normalize(query);
    if (q) {
      result = result.filter((u) =>
        `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q),
      );
    }

    return result.sort((a, b) => {
      const aValue = normalize(String(a[orderBy] ?? ""));
      const bValue = normalize(String(b[orderBy] ?? ""));
      const aEmpty = !aValue;
      const bEmpty = !bValue;

      if (aEmpty && !bEmpty) return 1;
      if (!aEmpty && bEmpty) return -1;
      if (aEmpty && bEmpty) return 0;

      if (order === "asc") {
        return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
      } else {
        return bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
      }
    });
  }, [normalize, order, orderBy, query, users]);

  return (
    <Box sx={usersTableSx.pageLayout}>
      <SidebarStub />
      <Box sx={usersTableSx.usersPageContainer}>
        <Breadcrumbs aria-label="breadcrumb" sx={usersTableSx.breadcrumbs}>
          <Typography component="span" sx={usersTableSx.breadcrumbItemActive}>
            Employees
          </Typography>
        </Breadcrumbs>
        <Box sx={usersTableSx.topBar}>
          <Box sx={usersTableSx.topBarSearch}>
            <UsersSearch value={query} onChange={setQuery} />
          </Box>
          <Box sx={usersTableSx.topBarActions}>
            <UsersFilter
              order={order}
              orderBy={orderBy}
              onOrderChange={setOrder}
              onOrderByChange={setOrderBy}
            />
            {isAdmin ? (
              <Button
                variant="text"
                sx={usersTableSx.addUserBtn}
                onClick={() => setCreateOpen(true)}
              >
                + Create user
              </Button>
            ) : null}
          </Box>
        </Box>
        {error ? <Box color="error.main">{error.message}</Box> : null}
        {loading ? (
          <PageLoader />
        ) : (
          <UsersTable
            users={processedUsers}
            onEditUser={(user) => {
              setEditingUser(user);
              setEditOpen(true);
            }}
            onViewUser={(user) => {
              router.push(`/users/${user.id}/profile`);
            }}
            onDeleteUser={(user) => {
              if (!isAdmin) return;
              setDeletingUser(user);
              setDeleteOpen(true);
            }}
          />
        )}
      </Box>
      <UserEditDialog
        key={`${editingUser?.id ?? "user-edit-dialog"}-${isEditOpen ? "open" : "closed"}`}
        open={isEditOpen}
        user={editingUser}
        onClose={() => setEditOpen(false)}
        onSaved={() => {
          void refetch();
        }}
      />
      <UserCreateDialog
        key={isCreateOpen ? "create-open" : "create-closed"}
        open={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => {
          void refetch();
        }}
      />
      <Dialog
        open={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        sx={usersTableSx.deleteDialogRoot}
      >
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
          Are you sure you want to delete user{" "}
          <strong>{deletingUser?.email}</strong>?
        </DialogContent>
        <DialogActions sx={usersTableSx.deleteDialogActions}>
          <Button
            onClick={() => setDeleteOpen(false)}
            disabled={deleting}
            sx={usersTableSx.deleteDialogCancelBtn}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!deletingUser || deleting}
            sx={usersTableSx.deleteDialogDeleteBtn}
            onClick={async () => {
              if (!deletingUser) return;
              await deleteUser({ variables: { userId: deletingUser.id } });
              setDeleteOpen(false);
              setDeletingUser(null);
              await refetch();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
