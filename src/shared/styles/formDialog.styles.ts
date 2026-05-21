const modalActionButtonBase = {
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

export const formDialogSx = {
  languageDialog: {
    "& .MuiDialog-paper": {
      bgcolor: "var(--app-surface)",
      backgroundImage: "none",
      borderRadius: 2,
      maxWidth: 440,
      width: "100%",
    },
  },
  addLanguageDialog: {
    "& .MuiDialog-paper": {
      maxWidth: 560,
    },
  },
  dialogTitleRoot: {
    m: 0,
    p: 0,
    px: 3,
    pt: 2,
  },
  addLanguageDialogTitleRoot: {
    m: 0,
    p: 0,
    px: 3,
    pt: 2,
    mb: 2.5,
  },
  dialogTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    pr: 0.5,
    pt: 1,
    pb: 0.5,
  },
  dialogTitleText: {
    fontSize: 20,
    fontWeight: 700,
    color: "var(--app-text)",
    letterSpacing: 0.2,
  },
  dialogCloseBtn: {
    color: "var(--app-text)",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.08)",
    },
  },
  dialogContent: {
    pt: 2,
    px: 3,
    pb: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    minWidth: 280,
  },
  addLanguageDialogContent: {
    pt: 2,
    px: 3,
    pb: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    minWidth: 320,
    overflow: "visible",
  },
  dialogField: {
    overflow: "visible",
    "& .MuiInputLabel-root": {
      color: "var(--app-text-muted)",
      maxWidth: "calc(100% - 8px)",
      overflow: "visible",
      whiteSpace: "nowrap",
      textOverflow: "clip",
    },
    "& .MuiInputLabel-root.Mui-focused, & .MuiFormLabel-root.Mui-focused": {
      color: "#df4d4d",
    },
    "& .MuiOutlinedInput-notchedOutline legend": {
      maxWidth: "100%",
    },
    "& .MuiOutlinedInput-root": {
      color: "var(--app-text)",
      overflow: "visible",
      "& fieldset, & .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--app-control-border)",
      },
      "&:hover fieldset, &:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,0.4)",
      },
      "&.Mui-focused fieldset, &.Mui-focused .MuiOutlinedInput-notchedOutline":
        {
          borderColor: "#df4d4d",
        },
    },
    "& .MuiOutlinedInput-input, & .MuiSelect-select": {
      overflow: "visible",
      textOverflow: "clip",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--app-text-muted)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiSvgIcon-root": {
      color: "#df4d4d",
    },
  },
  dialogActions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 2,
    px: 3,
    pb: 3,
    pt: 1,
  },
  dialogCancelBtn: {
    ...modalActionButtonBase,
    color: "var(--app-text-muted)",
    borderColor: "var(--app-control-border)",
    "&:hover": {
      borderColor: "rgba(255,255,255,0.35)",
      bgcolor: "rgba(255,255,255,0.04)",
    },
  },
  dialogConfirmBtn: {
    ...modalActionButtonBase,
    bgcolor: "#df4d4d",
    color: "#fff",
    "&:hover": {
      bgcolor: "#cf3d3d",
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(255,255,255,0.12)",
      color: "rgba(255,255,255,0.7)",
      boxShadow: "none",
    },
    "&.Mui-disabled:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
      boxShadow: "none",
    },
  },
  bulkDeleteCountBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: 32,
    height: 32,
    minWidth: 32,
    maxWidth: 32,
    flexShrink: 0,
    p: 0,
    borderRadius: "50%",
    bgcolor: "#fff",
    color: "#df4d4d",
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1,
  },
  bulkDeleteToolbarBtn: {
    ...modalActionButtonBase,
    bgcolor: "#df4d4d",
    color: "#fff",
    gap: 1.25,
    "&:hover": {
      bgcolor: "#cf3d3d",
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(255,255,255,0.12)",
      color: "rgba(255,255,255,0.7)",
      boxShadow: "none",
    },
    "&.Mui-disabled:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
      boxShadow: "none",
    },
  },
  dialogRemoveConfirmBtn: {
    ...modalActionButtonBase,
    bgcolor: "#df4d4d",
    color: "#fff",
    "&:hover": {
      bgcolor: "#cf3d3d",
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(255,255,255,0.12)",
      color: "rgba(255,255,255,0.7)",
      boxShadow: "none",
    },
    "&.Mui-disabled:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
      boxShadow: "none",
    },
  },
} as const;
