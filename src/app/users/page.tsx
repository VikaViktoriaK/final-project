"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { UsersTable } from "@/features/users/components/UsersTable";
import { usersTableSx } from "@/features/users/components/usersTable.styles";
import { USERS_MOCK } from "@/features/users/users.mock";

export default function UsersPage() {
  return (
    <Box sx={usersTableSx.page}>
      <UsersTable users={USERS_MOCK} />
    </Box>
  );
}
