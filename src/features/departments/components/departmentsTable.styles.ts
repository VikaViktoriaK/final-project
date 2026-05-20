import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

export const departmentsTableSx = {
  nameHeadCell: catalogTableSx.headCell,
  nameCell: {},
  actionsHeadCell: {
    ...catalogTableSx.headCell,
    width: 48,
    minWidth: 48,
    textAlign: "center",
  },
  actionsCell: catalogTableSx.actionsCell,
} as const;
