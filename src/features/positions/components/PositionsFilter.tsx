import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

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
    <Box sx={catalogTableSx.catalogFilter}>
      <TextField
        select
        label="Sort by"
        value="name"
        size="small"
        slotProps={{
          select: { readOnly: true },
        }}
        sx={catalogTableSx.catalogFilterSelect}
      >
        <MenuItem value="name">Name</MenuItem>
      </TextField>

      <IconButton
        onClick={handleToggleOrder}
        title={order === "asc" ? "Ascending" : "Descending"}
        aria-label={order === "asc" ? "Sort ascending" : "Sort descending"}
        sx={catalogTableSx.catalogFilterOrderBtn}
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
