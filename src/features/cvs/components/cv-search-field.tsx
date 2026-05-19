"use client";

import { InputAdornment, TextField } from "@mui/material";
import AppSearchIcon from "@/components/app-search-icon";
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
            <InputAdornment position="start" sx={cvsStyles.searchIconWrap}>
              <AppSearchIcon size={24} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default CvSearchField;
