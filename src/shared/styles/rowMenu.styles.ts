export const rowMenuSx = {
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
} as const;
