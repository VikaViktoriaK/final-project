import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

export const skillsTableSx = {
  nameHeadCell: {
    ...catalogTableSx.headCell,
    width: "50%",
  },
  categoryHeadCell: {
    ...catalogTableSx.headCell,
    width: "auto",
  },
  nameCell: {
    width: "50%",
  },
  categoryCell: {
    color: "var(--app-text-muted)",
  },
  actionsHeadCell: catalogTableSx.catalogActionsHeadCell,
  actionsCell: catalogTableSx.catalogActionsCell,
} as const;
