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
  actionsHeadCell: {
    ...catalogTableSx.headCell,
    width: 56,
    minWidth: 56,
    textAlign: "center",
  },
  actionsCell: {
    ...catalogTableSx.actionsCell,
    width: 56,
    minWidth: 56,
  },
} as const;
