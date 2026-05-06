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

type UsersTableProps = {
  users: UserRow[];
  onEditUser: (user: UserRow) => void;
};

export function UsersTable({ users, onEditUser }: UsersTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={usersTableSx.tableContainer}
    >
      <Table sx={usersTableSx.table} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell sx={usersTableSx.headFirstNameCell}>
              First Name
            </TableCell>
            <TableCell sx={usersTableSx.headLastNameCell}>Last Name</TableCell>
            <TableCell sx={usersTableSx.headEmailCell}>Email</TableCell>
            <TableCell sx={usersTableSx.headDepartmentCell}>
              <Box sx={usersTableSx.headDepartmentLabel}>
                <span>Department</span>
                <ArrowUpwardIcon />
              </Box>
            </TableCell>
            <TableCell sx={usersTableSx.headPositionCell}>Position</TableCell>
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
            users.map((u) => (
              <UsersTableRow key={u.id} user={u} onEdit={onEditUser} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
