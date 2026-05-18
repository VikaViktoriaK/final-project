import { usersTableSx } from "@/features/users/components/usersTable.styles";

const headSortable = {
  color: "var(--app-text-muted)",
  fontWeight: 600,
  letterSpacing: 0.2,
  whiteSpace: "nowrap" as const,
};

export const skillsTableSx = {
  nameHeadCell: {
    ...headSortable,
    width: "50%",
  },
  categoryHeadCell: {
    ...headSortable,
    width: "auto",
  },
  nameCell: {
    width: "50%",
  },
  categoryCell: {
    color: "var(--app-text-muted)",
  },
  actionsHeadCell: usersTableSx.headCell,
  actionsCell: usersTableSx.actionsCell,
  sortButton: usersTableSx.headDepartmentLabel,
} as const;
