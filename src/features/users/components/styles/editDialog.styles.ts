const dialogActionButtonBase = {
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

export const editDialogSx = {
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
    gap: 3,
    justifyContent: "flex-end",
  },
  editDialogCancelBtn: {
    ...dialogActionButtonBase,
    color: "#fff",
    borderColor: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(255,255,255,0.35)",
  },
  editDialogUpdateBtn: {
    ...dialogActionButtonBase,
    backgroundColor: "rgba(255,255,255,0.18)",
    color: "#fff",
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
