"use client";

import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { ChangeEvent } from "react";
import { cvsStyles } from "../styles/cvs.styles";

type CvSearchFieldProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  compact?: boolean;
};

function CvSearchField({
  value,
  onChange,
  compact = false,
}: CvSearchFieldProps) {
  return (
    <TextField
      placeholder="Search"
      value={value}
      onChange={onChange}
      sx={[cvsStyles.searchField, compact && cvsStyles.searchFieldCompact]}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={cvsStyles.searchIcon} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default CvSearchField;
