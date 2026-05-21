"use client";

import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchFieldSx } from "@/shared/styles/searchField.styles";
import type { SearchFieldProps } from "./types";

function SearchField({
  value,
  onChange,
  compact = false,
  placeholder = "Search",
}: SearchFieldProps) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      size="small"
      fullWidth
      sx={[
        searchFieldSx.searchField,
        compact && {
          width: "min(480px, 100%)",
          maxWidth: "100%",
        },
      ]}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SearchField;
