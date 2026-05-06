"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { usersTableSx } from "./usersTable.styles";
import type { UserRow } from "@/features/users/types";
import { getCurrentUserId } from "@/features/auth/lib/auth-storage";

function initials(firstName: string, lastName: string) {
  const a = (firstName?.[0] ?? "").toUpperCase();
  const b = (lastName?.[0] ?? "").toUpperCase();
  return `${a}${b}` || "U";
}

type UsersTableRowProps = {
  user: UserRow;
  onEdit: (user: UserRow) => void;
};

export function UsersTableRow({ user, onEdit }: UsersTableRowProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const currentUserId = getCurrentUserId();
  const canEdit = currentUserId === user.id;
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!canEdit) return;
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleEdit = () => {
    handleMenuClose();
    onEdit(user);
  };

  return (
    <TableRow sx={usersTableSx.row}>
      <TableCell sx={usersTableSx.firstNameCell}>
        <Box sx={usersTableSx.nameCell}>
          <Avatar src={user.avatarUrl} sx={usersTableSx.avatar}>
            {initials(user.firstName, user.lastName)}
          </Avatar>
          <Typography variant="body2">{user.firstName}</Typography>
        </Box>
      </TableCell>
      <TableCell sx={usersTableSx.lastNameCell}>
        <Typography variant="body2">{user.lastName}</Typography>
      </TableCell>
      <TableCell sx={usersTableSx.emailCell}>
        <Typography variant="body2" sx={usersTableSx.email}>
          {user.email}
        </Typography>
      </TableCell>
      <TableCell sx={usersTableSx.departmentCell}>
        <Typography variant="body2">{user.department}</Typography>
      </TableCell>
      <TableCell sx={usersTableSx.positionCell}>
        <Typography variant="body2">{user.position}</Typography>
      </TableCell>
      <TableCell sx={usersTableSx.actionsCell}>
        <IconButton
          size="small"
          sx={usersTableSx.actionsBtn}
          onClick={handleMenuOpen}
          disabled={!canEdit}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          sx={usersTableSx.rowMenu}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}
