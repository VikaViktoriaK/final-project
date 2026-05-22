"use client";

import { Box } from "@mui/material";
import ProjectSortColumn from "@/components/project-sort-column";
import { useTranslation } from "@/i18n/use-translation";
import type { MessageKey } from "@/i18n/messages";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";
import type { SortableProjectsHeaderProps } from "./types";

const PROJECT_SORT_COLUMNS: ReadonlyArray<{
  labelKey: MessageKey;
  field: "name" | "domain" | "startDate" | "endDate";
}> = [
  { labelKey: "common.name", field: "name" },
  { labelKey: "table.domain", field: "domain" },
  { labelKey: "table.startDate", field: "startDate" },
  { labelKey: "table.endDate", field: "endDate" },
];

function SortableProjectsHeader({
  sortField,
  sortDirection,
  onSort,
}: SortableProjectsHeaderProps) {
  const { t } = useTranslation();

  return (
    <Box sx={cvsStyles.projectsHeaderRow}>
      {PROJECT_SORT_COLUMNS.map((column) => (
        <Box key={column.field} sx={cvsStyles.projectGridCell}>
          <ProjectSortColumn
            label={t(column.labelKey)}
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
