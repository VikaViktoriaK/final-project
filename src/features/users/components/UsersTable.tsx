"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { UserRow } from "../types";
import { UsersTableRow } from "./UsersTableRow";
import { usersTableSx } from "./usersTable.styles";

export function UsersTable({ users }: { users: UserRow[] }) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={usersTableSx.tableContainer}
    >
      <Table sx={usersTableSx.table} aria-label="users table">
        <colgroup>
          <col style={{ width: 220 }} />
          <col style={{ width: 190 }} />
          <col style={{ width: 300 }} />
          <col style={{ width: 180 }} />
          <col style={{ width: 220 }} />
          <col style={{ width: 56 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell sx={usersTableSx.headCell}>First Name</TableCell>
            <TableCell sx={usersTableSx.headCell}>Last Name</TableCell>
            <TableCell sx={usersTableSx.headCell}>Email</TableCell>
            <TableCell sx={usersTableSx.headCell}>
              <Box
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}
              >
                <span>Department</span>
                <ArrowUpwardIcon />
              </Box>
            </TableCell>
            <TableCell sx={usersTableSx.headCell}>Position</TableCell>
            <TableCell sx={usersTableSx.headCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} sx={usersTableSx.emptyState}>
                Users not found
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => <UsersTableRow key={u.id} user={u} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
