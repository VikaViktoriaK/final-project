export const dataTableSx = {
  tableContainer: {
    backgroundColor: "var(--app-bg)",
    border: "none",
    borderRadius: 0,
    overflowX: "auto",
    "@media (min-width: 1200px)": {
      overflowX: "hidden",
    },
  },
  table: {
    width: "100%",
    minWidth: 0,
    tableLayout: "fixed",
    "& .MuiTableCell-root": {
      borderBottom: "1px solid var(--app-divider)",
      color: "var(--app-text)",
      py: 2,
      px: 1.25,
      boxSizing: "border-box",
    },
    "@media (min-width: 1200px)": {
      "& .MuiTableCell-root": {
        px: 1.5,
      },
    },
  },
  headCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 44,
    minWidth: 44,
    textAlign: "center",
    "@media (min-width: 1200px)": {
      width: 48,
      minWidth: 48,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  headAvatarCell: {
    width: 64,
    color: "var(--app-text-muted)",
  },
  headFirstNameCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 138,
    "@media (min-width: 1200px)": {
      width: 158,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  headLastNameCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 132,
    "@media (min-width: 1200px)": {
      width: 170,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  headLastNameCellMobileHidden: {
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  headEmailCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 200,
    "@media (min-width: 1200px)": {
      width: 248,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  headEmailCellMobileHidden: {
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  headDepartmentCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 124,
    "@media (min-width: 1200px)": {
      width: 154,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  headPositionCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 148,
    "@media (min-width: 1200px)": {
      width: 190,
    },
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  headDepartmentLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
  },
  firstNameCell: {
    width: 138,
    "@media (min-width: 1200px)": {
      width: 158,
    },
  },
  avatarCell: {
    width: 64,
    textAlign: "center",
  },
  lastNameCell: {
    width: 132,
    "@media (min-width: 1200px)": {
      width: 170,
    },
  },
  lastNameCellMobileHidden: {
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  emailCell: {
    width: 200,
    "@media (min-width: 1200px)": {
      width: 248,
    },
  },
  emailCellMobileHidden: {
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  departmentCell: {
    width: 124,
    "@media (min-width: 1200px)": {
      width: 154,
    },
  },
  positionCell: {
    width: 148,
    "@media (min-width: 1200px)": {
      width: 190,
    },
  },
  row: {
    "&:hover": { backgroundColor: "rgba(255,255,255,0.03)" },
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
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
    width: 44,
    minWidth: 44,
    textAlign: "center",
    px: 1.25,
    "@media (min-width: 1200px)": {
      width: 48,
      minWidth: 48,
      px: 1.5,
    },
  },
  actionsBtn: {
    color: "var(--app-text-muted)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  actionsBtnChevron: {
    color: "var(--app-text-muted)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
    "@media (min-width: 768px)": {
      display: "none",
    },
  },
  emptyState: {
    color: "var(--app-text-muted)",
    textAlign: "center",
    py: 6,
  },
} as const;
