"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { SkillsSortField } from "../types";
import { usersTableSx } from "@/features/users/components/usersTable.styles";

type SkillsFilterProps = {
  orderBy: SkillsSortField;
  order: "asc" | "desc";
  onOrderByChange: (field: SkillsSortField) => void;
  onOrderChange: (order: "asc" | "desc") => void;
};

export function SkillsFilter({
  orderBy,
  order,
  onOrderByChange,
  onOrderChange,
}: SkillsFilterProps) {
  return (
    <Box sx={usersTableSx.usersFilter}>
      <TextField
        select
        label="Sort by"
        value={orderBy}
        size="small"
        onChange={(e) => onOrderByChange(e.target.value as SkillsSortField)}
        sx={usersTableSx.usersFilterSelect}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="category">Category</MenuItem>
      </TextField>

      <IconButton
        onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
        title={order === "asc" ? "Ascending" : "Descending"}
        aria-label={order === "asc" ? "Sort ascending" : "Sort descending"}
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
