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
import { catalogTableSx } from "@/shared/styles";

type UsersTableProps = {
  users: UserRow[];
  onEditUser: (user: UserRow) => void;
  onViewUser: (user: UserRow) => void;
  onDeleteUser: (user: UserRow) => void;
};

export function UsersTable({
  users,
  onEditUser,
  onViewUser,
  onDeleteUser,
}: UsersTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={catalogTableSx.tableContainer}
    >
      <Table sx={catalogTableSx.table} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell sx={catalogTableSx.headAvatarCell} />
            <TableCell sx={catalogTableSx.headFirstNameCell}>
              First Name
            </TableCell>
            <TableCell
              sx={{
                ...catalogTableSx.headLastNameCell,
                ...catalogTableSx.headLastNameCellMobileHidden,
              }}
            >
              Last Name
            </TableCell>
            <TableCell
              sx={{
                ...catalogTableSx.headEmailCell,
                ...catalogTableSx.headEmailCellMobileHidden,
              }}
            >
              Email
            </TableCell>
            <TableCell sx={catalogTableSx.headDepartmentCell}>
              <Box sx={catalogTableSx.headDepartmentLabel}>
                <span>Department</span>
                <ArrowUpwardIcon />
              </Box>
            </TableCell>
            <TableCell sx={catalogTableSx.headPositionCell}>Position</TableCell>
            <TableCell sx={catalogTableSx.catalogActionsHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} sx={catalogTableSx.emptyState}>
                Users not found
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <UsersTableRow
                key={u.id}
                user={u}
                onEdit={onEditUser}
                onView={onViewUser}
                onDelete={onDeleteUser}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
