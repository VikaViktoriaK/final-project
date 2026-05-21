import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

export const departmentsTableSx = {
  nameHeadCell: catalogTableSx.headCell,
  nameCell: {},
  actionsHeadCell: catalogTableSx.catalogActionsHeadCell,
  actionsCell: catalogTableSx.catalogActionsCell,
} as const;
