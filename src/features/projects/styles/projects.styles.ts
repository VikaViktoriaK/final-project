import type { SxProps, Theme } from "@mui/material/styles";

export const projectsStyles = {
  environmentBox: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 1,
    minHeight: 56,
    px: 1.5,
    py: 1.25,
    border: "1px solid var(--app-control-border)",
    borderRadius: 0,
    bgcolor: "transparent",
    "&:focus-within": {
      borderColor: "var(--color-primary)",
    },
  },

  environmentChip: {
    bgcolor: "var(--app-overlay-12)",
    color: "var(--app-text)",
    fontSize: 12,
    maxWidth: 200,
    "& .MuiChip-deleteIcon": {
      color: "var(--app-text-muted)",
    },
  },

  environmentSelect: {
    minWidth: 120,
    flex: "1 1 120px",
    maxWidth: 200,
    height: 32,
    color: "var(--app-text-muted)",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiSelect-select": {
      py: 0.5,
      px: 1,
    },
  },

  environmentAddLabel: {
    color: "var(--app-text-muted)",
    fontSize: 14,
  },
} satisfies Record<string, SxProps<Theme>>;
