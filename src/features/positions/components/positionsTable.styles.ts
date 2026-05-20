import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

export const positionsTableSx = {
  nameHeadCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
  },
  nameCell: {},
  actionsHeadCell: catalogTableSx.headCell,
  actionsCell: catalogTableSx.actionsCell,
} as const;
