import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { USER_SORT_OPTIONS } from "@/features/users/constants/users.constants";
import type { UserSortField } from "@/features/users/types/usersList.types";
import type { SortOrder } from "@/lib/search";
import { catalogTableSx } from "@/shared/styles";

type UsersFilterProps = {
  orderBy: UserSortField;
  order: SortOrder;
  onOrderChange: (order: SortOrder) => void;
  onOrderByChange: (field: UserSortField) => void;
};

export function UsersFilter({
  orderBy,
  order,
  onOrderChange,
  onOrderByChange,
}: UsersFilterProps) {
  return (
    <Box sx={catalogTableSx.catalogFilter}>
      <TextField
        select
        label="Sort by"
        value={orderBy}
        size="small"
        onChange={(event) =>
          onOrderByChange(event.target.value as UserSortField)
        }
        sx={catalogTableSx.catalogFilterSelect}
      >
        {USER_SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <IconButton
        onClick={() => onOrderChange(order === "asc" ? "desc" : "asc")}
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
