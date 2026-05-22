import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "@/i18n/use-translation";
import { searchFieldSx } from "@/shared/styles/searchField.styles";

export type CatalogSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CatalogSearch({ value, onChange }: CatalogSearchProps) {
  const { t } = useTranslation();

  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t("common.search")}
      variant="outlined"
      size="small"
      fullWidth
      sx={searchFieldSx.searchField}
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
