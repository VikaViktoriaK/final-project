export const usersTableSx = {
  page: {
    minHeight: "100vh",
    px: { xs: 2, md: 3 },
    py: { xs: 3, md: 4 },
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
    gap: 2,
  },
  searchField: {
    width: "min(640px, 100%)",
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
  headFirstNameCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 220,
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
    width: 190,
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  headEmailCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 300,
    "& .MuiSvgIcon-root": {
      fontSize: 16,
      color: "var(--app-text-muted)",
    },
  },
  headDepartmentCell: {
    color: "var(--app-text-muted)",
    fontWeight: 600,
    letterSpacing: 0.2,
    whiteSpace: "nowrap",
    width: 180,
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
    width: 220,
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
    width: 220,
  },
  lastNameCell: {
    width: 190,
  },
  emailCell: {
    width: 300,
  },
  departmentCell: {
    width: 180,
  },
  positionCell: {
    width: 220,
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
    p: 3,
  },
  rowMenu: {
    "& .MuiPaper-root": {
      backgroundColor: "var(--app-surface)",
      color: "var(--app-text)",
      border: "1px solid var(--app-control-border)",
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
