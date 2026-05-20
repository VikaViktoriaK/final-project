"use client";

import { TableSortLabel } from "@mui/material";
import { TableSortArrowIcon } from "@/components/app-arrow";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";
import type { ProjectSortColumnProps } from "./types";

function ProjectSortColumn({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
}: ProjectSortColumnProps) {
  const handleClick = () => {
    onSort(field);
  };

  return (
    <TableSortLabel
      active={sortField === field}
      direction={sortField === field ? sortDirection : "asc"}
      onClick={handleClick}
      IconComponent={TableSortArrowIcon}
      sx={catalogTableSx.tableSortLabel}
    >
      {label}
    </TableSortLabel>
  );
}

export default ProjectSortColumn;
