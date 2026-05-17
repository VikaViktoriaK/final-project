"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { usersTableSx } from "@/features/users/components/usersTable.styles";

type PositionsFilterProps = {
  order: "asc" | "desc";
  onOrderChange: (order: "asc" | "desc") => void;
};

export function PositionsFilter({
  order,
  onOrderChange,
}: PositionsFilterProps) {
  const handleToggleOrder = () => {
    onOrderChange(order === "asc" ? "desc" : "asc");
  };

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
        onClick={handleToggleOrder}
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
