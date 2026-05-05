"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { UserRow } from "../types";
import { usersTableSx } from "./usersTable.styles";

interface UsersFilterProps {
  orderBy: keyof UserRow;
  order: "asc" | "desc";
  onOrderChange: (order: "asc" | "desc") => void;
  onOrderByChange: (property: keyof UserRow) => void;
}

export function UsersFilter({
  orderBy,
  order,
  onOrderChange,
  onOrderByChange,
}: UsersFilterProps) {
  const options: { value: keyof UserRow; label: string }[] = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "email", label: "Email" },
    { value: "department", label: "Department" },
    { value: "position", label: "Position" },
  ];

  return (
    <Box sx={usersTableSx.usersFilter}>
      <TextField
        select
        label="Sort by"
        value={orderBy}
        size="small"
        onChange={(e) => onOrderByChange(e.target.value as keyof UserRow)}
        sx={usersTableSx.usersFilterSelect}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <IconButton
        onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
        title={order === "asc" ? "Ascending" : "Descending"}
        sx={usersTableSx.usersFilterOrderBtn}
      >
        {order === "asc" ? (
          <ArrowUpwardIcon fontSize="small" />
        ) : (
          <ArrowDownwardIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
}
