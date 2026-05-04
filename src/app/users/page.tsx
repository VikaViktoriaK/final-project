"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { PageLoader } from "@/components/PageLoader";
import { UsersTable } from "@/features/users/components/UsersTable";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import { useUsersQuery } from "@/features/users/api/getUsers";
import type { UserRow } from "@/features/users/types";

function normalizeSearch(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export default function UsersPage() {
  const [query, setQuery] = React.useState("");
  const { users, loading, error } = useUsersQuery();

  React.useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  const filteredUsers = React.useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return users;

    const tokens = q.split(" ").filter(Boolean);

    return users.filter((u: UserRow) => {
      const fullName = normalizeSearch(`${u.firstName} ${u.lastName}`);
      return tokens.every((t) => fullName.includes(t));
    });
  }, [query, users]);

  return (
    <Box sx={usersTableSx.page}>
      {error ? (
        <Box sx={{ mb: 2, color: "error.main" }}>
          <div>{error.message || "Failed to load users"}</div>
          <div style={{ marginTop: 4, opacity: 0.85, fontSize: 13 }}>
            Проверь `NEXT_PUBLIC_GRAPHQL_URL` (и что GraphQL сервер запущен).
          </div>
        </Box>
      ) : null}
      <Box sx={usersTableSx.topBar}>
        <UsersSearch value={query} onChange={setQuery} />
      </Box>
      {loading ? (
        <PageLoader minHeight="calc(100vh - 200px)" />
      ) : (
        <UsersTable users={filteredUsers} />
      )}
    </Box>
  );
}
