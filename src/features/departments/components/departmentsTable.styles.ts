import { usersTableSx } from "@/features/users/components/usersTable.styles";

export const departmentsTableSx = {
  nameHeadCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
  },
  nameCell: {},
  actionsHeadCell: usersTableSx.headCell,
  actionsCell: usersTableSx.actionsCell,
} as const;
