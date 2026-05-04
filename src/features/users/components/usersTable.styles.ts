export const usersTableSx = {
  page: {
    minHeight: "100vh",
    px: { xs: 2, md: 3 },
    py: { xs: 3, md: 4 },
  },
  tableContainer: {
    backgroundColor: "var(--app-bg)",
    border: "none",
    borderRadius: 0,
    overflow: "visible",
  },
  table: {
    minWidth: 900,
    "& .MuiTableCell-root": {
      borderBottom: "1px solid var(--app-divider)",
      color: "var(--app-text)",
      py: 2,
    },
  },
  headCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  row: {
    "&:hover": { backgroundColor: "rgba(255,255,255,0.03)" },
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    minWidth: 170,
  },
  avatar: {
    width: 34,
    height: 34,
    bgcolor: "rgba(255,255,255,0.12)",
    color: "var(--app-text)",
    fontSize: 14,
    fontWeight: 700,
  },
  email: {
    color: "var(--app-text-muted)",
    whiteSpace: "nowrap",
  },
  actionsCell: {
    width: 56,
    textAlign: "right",
  },
  actionsBtn: {
    color: "var(--app-text-muted)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
  },
} as const;
