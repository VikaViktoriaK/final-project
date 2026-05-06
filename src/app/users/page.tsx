"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { PageLoader } from "@/components/PageLoader";
import { UsersTable } from "@/features/users/components/UsersTable";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { UsersFilter } from "@/features/users/components/UsersFilter";
import { UserEditDialog } from "@/features/users/components/UserEditDialog";
import { useUsersQuery } from "@/features/users/api/getUsers";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import type { UserRow } from "@/features/users/types";

export default function UsersPage() {
  const [query, setQuery] = React.useState("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof UserRow>("firstName");
  const [editingUser, setEditingUser] = React.useState<UserRow | null>(null);
  const [isEditOpen, setEditOpen] = React.useState(false);

  const { users, loading, error, refetch } = useUsersQuery();

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

      if (order === "asc") {
        return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
      } else {
        return bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
      }
    });
  }, [normalize, order, orderBy, query, users]);

  return (
    <Box sx={usersTableSx.usersPageContainer}>
      <Box sx={usersTableSx.topBar}>
        <UsersSearch value={query} onChange={setQuery} />
        <UsersFilter
          order={order}
          orderBy={orderBy}
          onOrderChange={setOrder}
          onOrderByChange={setOrderBy}
        />
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
        />
      )}
      <UserEditDialog
        key={editingUser?.id ?? "user-edit-dialog"}
        open={isEditOpen}
        user={editingUser}
        onClose={() => setEditOpen(false)}
        onSaved={() => {
          void refetch();
        }}
      />
    </Box>
  );
}
