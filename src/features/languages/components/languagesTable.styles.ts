import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

export const languagesTableSx = {
  nameHeadCell: {
    ...catalogTableSx.headCell,
    width: "30%",
  },
  nativeNameHeadCell: {
    ...catalogTableSx.headCell,
    width: "42%",
  },
  iso2HeadCell: {
    ...catalogTableSx.headCell,
    ...catalogTableSx.headCellMuted,
    width: 72,
    minWidth: 72,
    maxWidth: 72,
    pr: 1.5,
    pl: 1,
    whiteSpace: "nowrap",
  },
  nameCell: {
    width: "30%",
  },
  nativeNameCell: {
    color: "var(--app-text-muted)",
    width: "42%",
    maxWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  iso2Cell: {
    color: "var(--app-text-muted)",
    textTransform: "uppercase",
    width: 72,
    minWidth: 72,
    maxWidth: 72,
    pr: 1.5,
    pl: 1,
    whiteSpace: "nowrap",
  },
  actionsHeadCell: {
    ...catalogTableSx.headCell,
    width: 56,
    minWidth: 56,
    textAlign: "center",
    pl: 2,
  },
  actionsCell: {
    ...catalogTableSx.actionsCell,
    width: 56,
    minWidth: 56,
    pl: 2,
  },
} as const;
