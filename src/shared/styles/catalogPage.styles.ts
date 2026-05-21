export const catalogPageSx = {
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
  catalogPageContainer: {
    p: 0,
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
  createButton: {
    borderRadius: 999,
    height: 48,
    minHeight: 48,
    minWidth: 160,
    px: 4,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    fontSize: 14,
    fontWeight: 700,
    color: "#df4d4d",
    "&:hover": {
      backgroundColor: "rgba(223,77,77,0.10)",
    },
  },
} as const;
