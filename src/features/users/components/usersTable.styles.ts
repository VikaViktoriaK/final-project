export const usersTableSx = {
  page: {
    minHeight: "100vh",
    px: { xs: 2, md: 3 },
    py: { xs: 3, md: 4 },
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },
  searchField: {
    width: "min(640px, 100%)",
    "& .MuiInputBase-root": {
      borderRadius: 999,
      backgroundColor: "var(--app-control-bg)",
      border: "1px solid var(--app-control-border)",
      color: "var(--app-text)",
    },
    "& .MuiInputBase-input": {
      py: 1.35,
    },
    "& .MuiSvgIcon-root": {
      color: "var(--app-text-muted)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  tableContainer: {
    backgroundColor: "var(--app-bg)",
    border: "none",
    borderRadius: 0,
    overflow: "visible",
  },
  table: {
    minWidth: 900,
    tableLayout: "fixed",
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
  emptyState: {
    color: "var(--app-text-muted)",
    textAlign: "center",
    py: 6,
  },
} as const;
