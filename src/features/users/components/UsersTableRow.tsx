"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { UserRow } from "../types";
import { usersTableSx } from "./usersTable.styles";

function initials(firstName: string, lastName: string) {
  const a = (firstName?.[0] ?? "").toUpperCase();
  const b = (lastName?.[0] ?? "").toUpperCase();
  return `${a}${b}` || "U";
}

export function UsersTableRow({ user }: { user: UserRow }) {
  return (
    <TableRow sx={usersTableSx.row}>
      <TableCell>
        <Box sx={usersTableSx.nameCell}>
          <Avatar src={user.avatarUrl} sx={usersTableSx.avatar}>
            {initials(user.firstName, user.lastName)}
          </Avatar>
          <Typography variant="body2">{user.firstName}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{user.lastName}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={usersTableSx.email}>
          {user.email}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{user.department}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{user.position}</Typography>
      </TableCell>
      <TableCell sx={usersTableSx.actionsCell}>
        <IconButton
          aria-label="row actions"
          size="small"
          sx={usersTableSx.actionsBtn}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
