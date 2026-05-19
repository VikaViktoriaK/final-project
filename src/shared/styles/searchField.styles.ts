export const searchFieldSx = {
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
} as const;
