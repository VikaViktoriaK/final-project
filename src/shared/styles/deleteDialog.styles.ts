const deleteDialogActionButtonBase = {
  borderRadius: 999,
  minWidth: 160,
  height: 48,
  minHeight: 48,
  px: 4,
  py: 0,
  textTransform: "uppercase",
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: 0.6,
  boxShadow: "none",
} as const;

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
    gap: 3,
    justifyContent: "flex-end",
  },
  deleteDialogCancelBtn: {
    ...deleteDialogActionButtonBase,
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.35)",
  },
  deleteDialogDeleteBtn: {
    ...deleteDialogActionButtonBase,
    backgroundColor: "rgba(255, 80, 80, 0.35)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(255, 80, 80, 0.48)",
    },
    "&.Mui-disabled": {
      color: "rgba(255,255,255,0.7)",
      backgroundColor: "rgba(255, 80, 80, 0.22)",
    },
  },
} as const;
