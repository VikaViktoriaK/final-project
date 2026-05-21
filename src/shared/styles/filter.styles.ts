export const catalogFilterSx = {
  catalogFilter: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  catalogFilterSelect: {
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
  catalogFilterOrderBtn: {
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
} as const;
