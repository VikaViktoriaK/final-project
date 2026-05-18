"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { usersTableSx } from "@/features/users/components/usersTable.styles";

type LanguagesFilterProps = {
  order: "asc" | "desc";
  onOrderChange: (order: "asc" | "desc") => void;
};

export function LanguagesFilter({
  order,
  onOrderChange,
}: LanguagesFilterProps) {
  return (
    <Box sx={usersTableSx.usersFilter}>
      <TextField
        select
        label="Sort by"
        value="name"
        size="small"
        slotProps={{
          select: { readOnly: true },
        }}
        sx={usersTableSx.usersFilterSelect}
      >
        <MenuItem value="name">Name</MenuItem>
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
