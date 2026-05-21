"use client";

import { Box } from "@mui/material";
import ProjectSortColumn from "@/components/project-sort-column";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";
import type { SortableProjectsHeaderProps } from "./types";

const PROJECT_SORT_COLUMNS = [
  { label: "Name", field: "name" },
  { label: "Domain", field: "domain" },
  { label: "Start Date", field: "startDate" },
  { label: "End Date", field: "endDate" },
] as const;

function SortableProjectsHeader({
  sortField,
  sortDirection,
  onSort,
}: SortableProjectsHeaderProps) {
  return (
    <Box sx={cvsStyles.projectsHeaderRow}>
      {PROJECT_SORT_COLUMNS.map((column) => (
        <Box key={column.field} sx={cvsStyles.projectGridCell}>
          <ProjectSortColumn
            label={column.label}
            field={column.field}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </Box>
      ))}
      <Box sx={cvsStyles.projectGridActions} aria-hidden />
    </Box>
  );
}

export default SortableProjectsHeader;
