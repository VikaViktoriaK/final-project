"use client";

import { InputAdornment, TextField } from "@mui/material";
import AppSearchIcon from "@/components/app-search-icon";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";
import type { SearchFieldProps } from "./types";

function SearchField({
  value,
  onChange,
  compact = false,
  placeholder = "",
}: SearchFieldProps) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={[cvsStyles.searchField, compact && cvsStyles.searchFieldCompact]}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" sx={cvsStyles.searchIconWrap}>
              <AppSearchIcon size={24} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default SearchField;
