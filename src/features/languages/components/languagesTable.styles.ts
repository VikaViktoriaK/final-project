import { usersTableSx } from "@/features/users/components/usersTable.styles";

const headCell = {
  color: "var(--app-text-muted)",
  fontWeight: 600,
  letterSpacing: 0.2,
  whiteSpace: "nowrap" as const,
};

export const languagesTableSx = {
  nameHeadCell: headCell,
  nativeNameHeadCell: headCell,
  iso2HeadCell: {
    ...headCell,
    width: 100,
  },
  nameCell: {},
  nativeNameCell: {
    color: "var(--app-text-muted)",
  },
  iso2Cell: {
    color: "var(--app-text-muted)",
    textTransform: "uppercase",
  },
  actionsHeadCell: usersTableSx.headCell,
  actionsCell: usersTableSx.actionsCell,
  sortButton: usersTableSx.headDepartmentLabel,
} as const;
