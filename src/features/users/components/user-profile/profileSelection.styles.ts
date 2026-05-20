/** Shared remove-mode chip selection (languages + skills profile). */
export const profileSelectionSx = {
  chip: {
    borderRadius: 999,
    border: "2px solid transparent",
    boxSizing: "border-box",
    transition:
      "border-color 0.2s ease, background-color 0.2s ease, outline 0.2s ease",
    "&:focus-visible": {
      outline: "2px solid #df4d4d",
      outlineOffset: 2,
    },
  },
  chipSelected: {
    borderColor: "#df4d4d",
    bgcolor: "rgba(223,77,77,0.12)",
  },
} as const;
