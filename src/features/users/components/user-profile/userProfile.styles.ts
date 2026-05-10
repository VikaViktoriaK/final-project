export const userProfileSx = {
  pageLayout: {
    minHeight: "100vh",
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
  container: {
    width: "100%",
    maxWidth: 980,
    mx: "auto",
  },
  breadcrumbs: {
    mb: 2,
    "& .MuiBreadcrumbs-separator": {
      color: "var(--app-text-muted)",
    },
  },
  breadcrumbLink: {
    color: "var(--app-text-muted)",
    fontSize: 14,
  },
  breadcrumbActive: {
    color: "#df4d4d",
    fontSize: 14,
  },
  tabs: {
    minHeight: 40,
    mb: 5,
    "& .MuiTabs-indicator": {
      backgroundColor: "#df4d4d",
      height: 2,
    },
  },
  tab: {
    textTransform: "uppercase",
    color: "var(--app-text-muted)",
    minHeight: 40,
    px: 2,
    fontSize: 13,
    fontWeight: 600,
    "&.Mui-selected": {
      color: "#df4d4d",
    },
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    justifyContent: "center",
    flexWrap: "wrap",
    mb: 3,
  },
  avatar: {
    width: 88,
    height: 88,
    bgcolor: "rgba(255,255,255,0.35)",
    color: "rgba(0,0,0,0.45)",
    fontSize: 40,
    fontWeight: 500,
  },
  uploadBlock: {
    minWidth: 220,
  },
  uploadBtn: {
    color: "var(--app-text)",
    justifyContent: "flex-start",
    textTransform: "none",
    px: 0,
    minWidth: 0,
    fontSize: 28,
    lineHeight: 1,
    "&:hover": {
      backgroundColor: "transparent",
      color: "#fff",
    },
  },
  uploadText: {
    color: "var(--app-text)",
    fontSize: 28,
  },
  uploadHint: {
    color: "var(--app-text-muted)",
    fontSize: 14,
  },
  identity: {
    textAlign: "center",
    mb: 4,
  },
  fullName: {
    fontSize: 34,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  email: {
    color: "var(--app-text-muted)",
    mt: 1,
    fontSize: 18,
  },
  memberSince: {
    color: "var(--app-text-muted)",
    mt: 0.5,
    fontSize: 15,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 2,
    "@media (min-width: 768px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  field: {
    "& .MuiInputLabel-root": {
      color: "var(--app-text-muted)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#df4d4d",
    },
    "& .MuiOutlinedInput-root": {
      color: "var(--app-text)",
      "& fieldset": {
        borderColor: "var(--app-control-border)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--app-control-border)",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "var(--app-text-muted)",
    },
  },
  updateBtnWrap: {
    display: "flex",
    justifyContent: "flex-end",
    mt: 3,
  },
  updateBtn: {
    minWidth: 300,
    borderRadius: 999,
    fontWeight: 700,
  },
  updateBtnDisabled: {
    backgroundColor: "rgba(255,255,255,0.18)",
    color: "rgba(255,255,255,0.55)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.24)",
    },
  },
  updateBtnActive: {
    backgroundColor: "#df4d4d",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#cf3d3d",
    },
  },
  formError: {
    color: "#ffb4b4",
    mt: 1.5,
  },
} as const;
