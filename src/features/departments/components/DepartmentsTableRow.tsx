"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { DepartmentRow } from "../types";
import { departmentsTableSx } from "./departmentsTable.styles";
import { usersTableSx } from "@/features/users/components/usersTable.styles";

type DepartmentsTableRowProps = {
  department: DepartmentRow;
  onEdit: (department: DepartmentRow) => void;
  onDelete: (department: DepartmentRow) => void;
  canManage: boolean;
};

export function DepartmentsTableRow({
  department,
  onEdit,
  onDelete,
  canManage,
}: DepartmentsTableRowProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <TableRow sx={usersTableSx.row}>
      <TableCell sx={departmentsTableSx.nameCell}>
        <Typography variant="body2">{department.name}</Typography>
      </TableCell>
      <TableCell sx={departmentsTableSx.actionsCell}>
        {canManage ? (
          <>
            <IconButton
              size="small"
              sx={usersTableSx.actionsBtn}
              onClick={handleMenuOpen}
              aria-label={`Actions for ${department.name}`}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              sx={usersTableSx.rowMenu}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onEdit(department);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onDelete(department);
                }}
                sx={usersTableSx.rowMenuDeleteItem}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        ) : null}
      </TableCell>
    </TableRow>
  );
}
