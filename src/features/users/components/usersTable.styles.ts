export const usersTableSx = {
  pageLayout: {
    minHeight: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 2,
    px: 2,
    py: 2,
    "@media (min-width: 768px)": {
      gridTemplateColumns: "140px minmax(0, 1fr)",
      gap: 3,
      px: 3,
      py: 3,
    },
    "@media (min-width: 1200px)": {
      gridTemplateColumns: "180px minmax(0, 1fr)",
    },
  },
  sidebarStub: {
    display: "none",
    alignItems: "flex-start",
    color: "var(--app-text-muted)",
    borderRight: "1px solid var(--app-divider)",
    pt: 1.5,
    pr: 2,
    "@media (min-width: 768px)": {
      display: "flex",
    },
  },
  breadcrumbs: {
    mb: 1.5,
    "& .MuiBreadcrumbs-separator": {
      color: "var(--app-text-muted)",
    },
  },
  breadcrumbItemActive: {
    color: "var(--app-text)",
    fontSize: 14,
    fontWeight: 600,
  },
  page: {
    minHeight: "100%",
    px: { xs: 2, md: 3 },
    py: { xs: 3, md: 4 },
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
    gap: 2,
    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
  topBarSearch: {
    flex: 1,
    minWidth: 0,
    pr: 2,
  },
  topBarActions: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    "@media (max-width: 768px)": {
      width: "100%",
      justifyContent: "space-between",
    },
  },
  addUserBtn: {
    borderRadius: 999,
    height: 36,
    px: 1.25,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    fontSize: 12,
    fontWeight: 700,
    color: "#df4d4d",
    "&:hover": {
      backgroundColor: "rgba(223,77,77,0.10)",
    },
  },
  searchField: {
    width: "min(640px, 100%)",
    maxWidth: "100%",
    "@media (max-width: 1024px)": {
      width: "100%",
    },
    "& .MuiInputBase-root": {
      borderRadius: 999,
      backgroundColor: "var(--app-control-bg)",
      border: "1px solid var(--app-control-border)",
      color: "var(--app-text)",
      transition: "all 0.2s ease-in-out",
      "&.Mui-focused": {
        borderColor: "var(--app-text-muted)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      },
    },
    "& .MuiInputBase-input": {
      py: 1.35,
    },
    "& .MuiSvgIcon-root": {
      color: "var(--app-text-muted)",
      transition: "color 0.2s",
    },
    "& .Mui-focused .MuiSvgIcon-root": {
      color: "var(--app-text)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
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
  usersFilter: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  usersFilterSelect: {
    minWidth: 160,
    "& .MuiInputBase-root": {
      color: "var(--app-text)",
      backgroundColor: "var(--app-control-bg)",
      borderRadius: 999,
      fontSize: "0.875rem",
      transition: "all 0.2s ease-in-out",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--app-control-border)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--app-text-muted)",
      },
      "&.Mui-focused": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--app-text-muted)",
          borderWidth: "1px",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--app-text-muted)",
      fontSize: "0.875rem",
      "&.Mui-focused": {
        color: "var(--app-text)",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "var(--app-text-muted)",
    },
    "& .Mui-focused .MuiSvgIcon-root": {
      color: "var(--app-text)",
    },
  },
  usersFilterOrderBtn: {
    border: "1px solid var(--app-control-border)",
    color: "var(--app-text-muted)",
    backgroundColor: "var(--app-control-bg)",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.08)",
      borderColor: "var(--app-text-muted)",
      color: "var(--app-text)",
    },
    "&.MuiIconButton-root": {
      color: "var(--app-text-muted)",
    },
    "&:active": {
      color: "var(--app-text)",
    },
  },
  usersPageContainer: {
    p: 0,
  },
  rowMenu: {
    "& .MuiPaper-root": {
      backgroundColor: "var(--app-surface)",
      color: "var(--app-text)",
      border: "1px solid var(--app-control-border)",
    },
  },
  rowMenuDeleteItem: {
    color: "#ffb4b4",
    "&:hover": {
      backgroundColor: "rgba(255, 80, 80, 0.12)",
    },
  },
  deleteDialogRoot: {
    "& .MuiPaper-root": {
      backgroundColor: "#353535",
      color: "#fff",
      border: "1px solid var(--app-control-border)",
      borderRadius: 1,
    },
  },
  deleteDialogActions: {
    px: 3,
    pb: 3,
    pt: 1,
    gap: 1,
    justifyContent: "flex-end",
  },
  deleteDialogCancelBtn: {
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.35)",
    borderRadius: 999,
    minWidth: 190,
    height: 42,
  },
  deleteDialogDeleteBtn: {
    backgroundColor: "rgba(255, 80, 80, 0.35)",
    color: "#fff",
    borderRadius: 999,
    minWidth: 190,
    height: 42,
    "&:hover": {
      backgroundColor: "rgba(255, 80, 80, 0.48)",
    },
    "&.Mui-disabled": {
      color: "rgba(255,255,255,0.7)",
      backgroundColor: "rgba(255, 80, 80, 0.22)",
    },
  },
  editDialogGrid: {
    pt: 1,
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    gap: 2,
  },
  editDialogRoot: {
    "& .MuiPaper-root": {
      backgroundColor: "#353535",
      color: "#fff",
      border: "1px solid var(--app-control-border)",
      borderRadius: 1,
    },
  },
  editDialogTitle: {
    color: "#fff",
    position: "relative",
    pr: 7,
  },
  editDialogCloseBtn: {
    position: "absolute",
    right: 12,
    top: 10,
    color: "#fff",
  },
  editDialogContent: {
    pt: 1,
    pb: 1,
  },
  editDialogField: {
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.75)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiInputBase-input": {
      color: "#fff !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.45)",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-disabled": {
        color: "#fff",
      },
      "&.Mui-disabled fieldset": {
        borderColor: "rgba(255,255,255,0.28)",
      },
    },
    "& .MuiSelect-select": {
      color: "#fff",
    },
  },
  editDialogSpacer: {
    gridColumn: { xs: "auto", sm: "1 / span 2" },
    maxWidth: { sm: "50%" },
  },
  editDialogActions: {
    px: 3,
    pb: 3,
    pt: 1,
    gap: 1,
    justifyContent: "flex-end",
  },
  editDialogCancelBtn: {
    color: "#fff",
    borderColor: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(255,255,255,0.35)",
    borderRadius: 999,
    minWidth: 190,
    height: 42,
  },
  editDialogUpdateBtn: {
    backgroundColor: "rgba(255,255,255,0.18)",
    color: "#fff",
    borderRadius: 999,
    minWidth: 190,
    height: 42,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.28)",
    },
    "&.Mui-disabled": {
      color: "rgba(255,255,255,0.7)",
      backgroundColor: "rgba(255,255,255,0.12)",
    },
  },
  editDialogSelectMenu: {
    "& .MuiPaper-root": {
      backgroundColor: "#3a3a3a",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.2)",
    },
    "& .MuiMenuItem-root": {
      color: "#fff",
    },
    "& .MuiMenuItem-root.Mui-selected": {
      backgroundColor: "rgba(255,255,255,0.16)",
    },
    "& .MuiMenuItem-root.Mui-selected:hover": {
      backgroundColor: "rgba(255,255,255,0.24)",
    },
  },
} as const;
