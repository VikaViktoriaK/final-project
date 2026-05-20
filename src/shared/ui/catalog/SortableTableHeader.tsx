"use client";

import { TableSortLabel } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { TableSortArrowIcon } from "@/components/app-arrow";
import { catalogTableHeadSx } from "@/shared/styles/catalogTableHead.styles";

export type SortableTableHeaderProps<T extends string> = {
  label: string;
  field: T;
  sortField: T;
  sortDirection: "asc" | "desc";
  onSort: (field: T) => void;
  sx?: SxProps<Theme>;
};

export function SortableTableHeader<T extends string>({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
  sx,
}: SortableTableHeaderProps<T>) {
  const isActive = sortField === field;

  return (
    <TableSortLabel
      active={isActive}
      direction={isActive ? sortDirection : "asc"}
      onClick={() => onSort(field)}
      IconComponent={TableSortArrowIcon}
      sx={[
        catalogTableHeadSx.tableSortLabel,
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
    >
      {label}
    </TableSortLabel>
  );
}
