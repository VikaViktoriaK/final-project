export const deleteDialogSx = {
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
} as const;
