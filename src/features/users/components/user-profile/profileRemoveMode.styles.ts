import { formDialogSx } from "@/shared/styles/formDialog.styles";

const toolbarButtonSize = {
  minHeight: 48,
  height: 48,
  boxSizing: "border-box" as const,
};

/** Shared remove-mode chips + bulk delete toolbar (languages & skills profile). */
export const profileRemoveModeSx = {
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
    "&:hover": {
      bgcolor: "rgba(223,77,77,0.16)",
    },
  },
  chipEntry: {
    minHeight: 48,
    height: 48,
    px: 2,
    py: 1,
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    maxWidth: "100%",
    background: "transparent",
    cursor: "pointer",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.06)",
    },
  },
  toolbarActionsRow: {
    display: "flex",
    justifyContent: { xs: "center", sm: "flex-end" },
    alignItems: "center",
    gap: 3,
    flexWrap: "wrap",
    mt: "auto",
    pt: 3,
    pr: { xs: 0, sm: 2 },
    pl: 0,
  },
  toolbarCancelBtn: {
    ...formDialogSx.dialogCancelBtn,
    ...toolbarButtonSize,
  },
  toolbarDeleteBtn: {
    ...formDialogSx.bulkDeleteToolbarBtn,
    ...toolbarButtonSize,
  },
  toolbarCountBadge: formDialogSx.bulkDeleteCountBadge,
} as const;

/** @deprecated Use profileRemoveModeSx — kept for existing imports */
export const profileSelectionSx = {
  chip: profileRemoveModeSx.chip,
  chipSelected: profileRemoveModeSx.chipSelected,
} as const;
