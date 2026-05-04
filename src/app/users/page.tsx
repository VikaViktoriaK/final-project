"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { UsersTable } from "@/features/users/components/UsersTable";
import { UsersSearch } from "@/features/users/components/UsersSearch";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import { USERS_MOCK } from "@/features/users/users.mock";

function normalizeSearch(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export default function UsersPage() {
  const [query, setQuery] = React.useState("");

  const filteredUsers = React.useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return USERS_MOCK;

    const tokens = q.split(" ").filter(Boolean);

    return USERS_MOCK.filter((u) => {
      const fullName = normalizeSearch(`${u.firstName} ${u.lastName}`);
      return tokens.every((t) => fullName.includes(t));
    });
  }, [query]);

  return (
    <Box sx={usersTableSx.page}>
      <Box sx={usersTableSx.topBar}>
        <UsersSearch value={query} onChange={setQuery} />
      </Box>
      <UsersTable users={filteredUsers} />
    </Box>
  );
}
