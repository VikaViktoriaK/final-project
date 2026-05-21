import type { SxProps, Theme } from "@mui/material/styles";
import { labelTypography } from "@/theme/app-theme";

const pillButtonBase: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 0,
  height: 48,
  minHeight: 48,
  flexShrink: 1,
  borderRadius: "40px",
  textTransform: "uppercase",
  textAlign: "center",
  ...labelTypography,
  boxShadow: "none",
};

const dialogCreateCvButtonBase: SxProps<Theme> = {
  ...pillButtonBase,
  alignSelf: "auto",
  width: "auto",
  maxWidth: { sm: 300 },
  minWidth: { xs: 180, sm: 210 },
  height: { xs: 60, sm: 66 },
  minHeight: { xs: 60, sm: 66 },
  flex: "0 0 auto",
  mt: 0,
  fontSize: { xs: 11, sm: 12 },
  px: { xs: 3.75, sm: 4.5 },
};

/**
 * CV feature styles — grouped by screen / component.
 * Import as `cvsStyles` from this file; keys are unchanged for existing components.
 */
export const cvsStyles = {
  // ---------------------------------------------------------------------------
  // Shared — used on multiple CV screens
  // ---------------------------------------------------------------------------

  /** Centered spinner wrapper (list page loading, etc.) */
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    py: 8,
  },

  textMuted: {
    color: "var(--app-text-muted)",
  },

  emptyState: {
    color: "var(--app-text-muted)",
    fontSize: 14,
    py: 2,
  },

  // ---------------------------------------------------------------------------
  // CV list page — `/cvs` (cvs-page, cvs-table, cv-search-field)
  // ---------------------------------------------------------------------------

  pageTopBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 1,
    width: "100%",
    mb: 3,
  },

  pageTitle: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: "0.15px",
    verticalAlign: "middle",
    textTransform: "capitalize",
    color: "var(--app-text-muted)",
    m: 0,
  },

  pageToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
    flexWrap: "nowrap",
    width: "100%",
    maxWidth: "100%",
  },

  searchField: {
    width: { xs: "auto", sm: 280, md: 320 },
    flex: { xs: "1 1 auto", md: "0 0 auto" },
    minWidth: { xs: 140, sm: 200 },
    maxWidth: { xs: 240, sm: 280, md: 320 },
    flexShrink: 1,
    "& .MuiOutlinedInput-root": {
      height: 40,
      borderRadius: "40px",
      bgcolor: "transparent",
      color: "var(--app-text)",
      pl: "12px",
      pr: "16px",
      alignItems: "center",
      "& fieldset": {
        borderWidth: "1px",
        borderColor: "var(--app-control-border)",
      },
      "&:hover fieldset": {
        borderColor: "var(--app-overlay-20)",
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1px",
        borderColor: "var(--app-text-muted)",
      },
      "@media (max-width: 400px)": {
        pl: "8px",
        pr: "12px",
      },
    },
    "& .MuiOutlinedInput-input": {
      py: 0,
      px: 0,
      height: "24px",
      boxSizing: "border-box",
      fontSize: 14,
      lineHeight: "24px",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "var(--app-text-muted)",
      opacity: 1,
    },
  },

  searchFieldCompact: {
    width: { xs: "auto", sm: 240, md: 280 },
    maxWidth: { xs: 220, sm: 280 },
    minWidth: { xs: 120, sm: 180 },
  },

  searchIconWrap: {
    height: 24,
    maxHeight: 24,
    margin: 0,
    marginRight: "8px",
    alignItems: "center",
    "& img": {
      width: 24,
      height: 24,
    },
    "@media (max-width: 400px)": {
      height: 20,
      maxHeight: 20,
      marginRight: "6px",
      "& img": {
        width: 20,
        height: 20,
      },
    },
  },

  createIconButton: {
    width: 40,
    height: 40,
    minWidth: 40,
    flexShrink: 0,
    borderRadius: "40px",
    color: "var(--color-primary)",
    p: 0,
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-subtle)",
      },
    },
  },

  createIconButtonGlyph: {
    fontSize: 28,
    fontWeight: 300,
    lineHeight: 1,
  },

  /** Pill CTA on projects tab (+ ADD PROJECT). */
  createButton: {
    width: 220,
    height: 40,
    minWidth: 220,
    maxWidth: 220,
    minHeight: 40,
    maxHeight: 40,
    flexShrink: 0,
    p: 0,
    borderRadius: "40px",
    bgcolor: "var(--color-primary-pill-bg)",
    color: "var(--color-primary)",
    textTransform: "uppercase",
    textAlign: "center",
    ...labelTypography,
    boxShadow: "none",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-pill-bg)",
        boxShadow: "none",
      },
    },
    "&.Mui-disabled": {
      bgcolor: "var(--color-primary-pill-bg)",
      color: "var(--color-primary)",
      opacity: 0.5,
    },
  },

  /** Centered Figma-width column with even side gutters on wide viewports. */
  cvContentFrame: {
    width: "100%",
    maxWidth: 1440,
    mx: "auto",
    px: { xs: 0, sm: 2, md: 3 },
    boxSizing: "border-box",
  },

  /** @deprecated Use `cvContentFrame` — kept for existing imports. */
  cvContentWidth: {
    width: "100%",
    maxWidth: 1440,
    mx: "auto",
    px: { xs: 0, sm: 2, md: 3 },
    boxSizing: "border-box",
  },

  tableContainer: {
    width: "100%",
    backgroundColor: "var(--app-surface)",
    containerType: "inline-size",
    containerName: "cvs-table",
  },

  table: {
    width: "100%",
    tableLayout: "fixed",
    backgroundColor: "transparent",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "24px",
    letterSpacing: "0.15px",
    "& .MuiTableCell-root": {
      color: "var(--app-text)",
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit",
    },
  },

  /**
   * Progressive collapse (container width): 3 cols → 2 → 1 + menu.
   * Priority left → right: Name (always) > Employee > Education (drops first).
   */
  tableColEducation: {
    display: "table-cell",
    width: "14%",
    "@container cvs-table (max-width: 680px)": {
      display: "none",
    },
  },

  tableColEmployee: {
    display: "table-cell",
    width: "auto",
    "@container cvs-table (max-width: 440px)": {
      display: "none",
    },
  },

  tableColName: {
    verticalAlign: "top",
    width: "32%",
    maxWidth: 406,
    minWidth: 0,
  },

  tableColActions: {
    width: 48,
    maxWidth: 48,
    px: 1,
    verticalAlign: "top",
  },

  tableHeadRow: {
    height: 58,
    "& th": {
      height: 58,
      verticalAlign: "middle",
      borderBottom: "1px solid var(--app-divider)",
    },
  },

  tableHeadCell: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "24px",
    letterSpacing: "0.15px",
    color: "var(--app-text)",
    height: 58,
    py: 0,
    px: 2,
    verticalAlign: "middle",
    borderBottom: "1px solid var(--app-divider)",
    whiteSpace: "nowrap",
  },

  tableHeadCellName: {
    width: "32%",
    maxWidth: 406,
    minWidth: 0,
  },

  tableSortLabel: {
    display: "inline-flex",
    width: "auto",
    maxWidth: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "2px",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    letterSpacing: "inherit",
    verticalAlign: "middle",
    "&.MuiTableSortLabel-root": {
      color: "inherit",
    },
    "&.MuiTableSortLabel-root:hover": {
      color: "inherit",
    },
    "&.MuiTableSortLabel-root.Mui-active": {
      color: "inherit",
    },
    "& .MuiTableSortLabel-icon": {
      margin: 0,
      padding: 0,
      width: 0,
      minWidth: 0,
      opacity: 0,
      overflow: "hidden",
      transition: "opacity 0.4s ease, transform 0.35s ease",
    },
    "&.Mui-active .MuiTableSortLabel-icon": {
      width: 18,
      minWidth: 18,
      height: 18,
      opacity: 1,
    },
  },

  tableDataRow: {
    "& td": {
      borderBottom: "1px solid var(--app-divider)",
      verticalAlign: "middle",
      py: 1.5,
    },
  },

  tableNameStack: {
    display: "flex",
    flexDirection: "column",
    gap: 0.25,
    minWidth: 0,
    pr: 1,
  },

  tableNamePrimary: {
    color: "var(--app-text)",
    textDecoration: "none",
    font: "inherit",
    letterSpacing: "inherit",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--color-primary)",
      },
    },
  },

  tableNameDescription: {
    m: 0,
    color: "var(--app-text-muted)",
    fontSize: 13,
    lineHeight: 1.5,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },

  tableEmployeeText: {
    font: "inherit",
    letterSpacing: "inherit",
    color: "var(--app-text)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  },

  menuIconButton: {
    color: "var(--app-text-muted)",
  },

  /** Kebab / row action menu (table, project cards). */
  contextMenuPaper: {
    bgcolor: "var(--app-dialog-surface)",
    color: "var(--app-text)",
    borderRadius: "12px",
    minWidth: 168,
    py: 0.5,
    border: "1px solid var(--app-divider)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
    backgroundImage: "none",
    "& .MuiList-root": {
      py: 0.5,
    },
    "& .MuiDivider-root": {
      borderColor: "var(--app-divider)",
      my: 0.5,
    },
  },

  contextMenuItem: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.01em",
    color: "var(--app-text)",
    textDecoration: "none",
    px: 2,
    py: 1.25,
    minHeight: 44,
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--app-overlay-06)",
      },
    },
    "&.Mui-focusVisible": {
      bgcolor: "var(--app-overlay-06)",
    },
    "&.Mui-selected": {
      bgcolor: "var(--app-overlay-06)",
      "&:hover": {
        bgcolor: "var(--app-overlay-12)",
      },
    },
  },

  menuItemDanger: {
    color: "var(--color-action-danger)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-subtle)",
        color: "var(--color-action-danger)",
      },
    },
  },

  cvNameLink: {
    color: "var(--app-text)",
    textDecoration: "none",
    fontWeight: 500,
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--color-primary)",
      },
    },
  },

  cvDescription: {
    color: "var(--app-text-muted)",
    fontSize: 13,
    lineHeight: 1.5,
    pt: 1,
    pb: 2,
    display: "block",
  },

  cvDescriptionIndented: {
    mt: 1.5,
  },

  // ---------------------------------------------------------------------------
  // Dialogs — create CV, confirm, add skill, project form
  // (create-cv-dialog, cv-confirm-dialog, add-skill-dialog, project-form-dialog)
  // ---------------------------------------------------------------------------

  dialog: {
    "& .MuiDialog-paper": {
      bgcolor: "var(--app-dialog-surface)",
      color: "var(--app-text)",
      borderRadius: 2,
      width: { xs: "calc(100% - 32px)", sm: "auto" },
      m: { xs: 2, sm: 3 },
    },
  },

  /** Form dialogs with side-by-side fields (add skill, project). */
  dialogForm: {
    "& .MuiDialog-paper": {
      minWidth: { xs: "auto", sm: 520, md: 640 },
    },
  },

  /** Create CV — compact modal (1.5× mock scale), no inner scrollbars. */
  dialogCreateCv: {
    "& .MuiDialog-paper": {
      width: { xs: "calc(100% - 32px)", sm: "auto" },
      maxWidth: { sm: 660 },
      minWidth: { sm: 540 },
      maxHeight: "none",
      overflow: "visible",
    },
    "& .MuiDialogTitle-root": {
      px: 3.75,
      pt: 3,
      pb: 0,
    },
  },

  dialogCreateCvContent: {
    overflow: "visible",
    px: 3.75,
    pt: 1.5,
    pb: 3.75,
  },

  dialogCreateCvForm: {
    width: "100%",
    maxWidth: "100%",
  },

  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 18,
    fontWeight: 500,
    color: "var(--app-text)",
    pb: 1,
    "& .MuiIconButton-root": {
      color: "var(--app-text-muted)",
    },
  },

  dialogContent: {
    pt: 1,
  },

  dialogActions: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "stretch",
    width: "100%",
    boxSizing: "border-box",
    px: { xs: 2, sm: 3 },
    pb: { xs: 2, sm: 3 },
    pt: 1,
    gap: { xs: 1, sm: 1.5 },
    "& > *": {
      flex: "1 1 0",
      minWidth: 0,
      maxWidth: "none",
      m: 0,
    },
    "& > :not(:first-of-type)": {
      ml: 0,
    },
  },

  skillDialogActions: {
    justifyContent: "flex-end",
    gap: 3,
    "& > *": {
      flex: "0 0 auto",
      minWidth: 160,
      maxWidth: 220,
      m: 0,
    },
  },

  dialogMessage: {
    color: "var(--app-text-muted)",
    fontSize: 14,
  },

  confirmHighlight: {
    color: "var(--app-text)",
  },

  cancelButton: {
    ...pillButtonBase,
    width: "100%",
    height: { xs: 40, sm: 48 },
    minHeight: { xs: 40, sm: 48 },
    fontSize: { xs: 11, sm: 12 },
    px: { xs: 2, sm: 4 },
    bgcolor: "transparent",
    backgroundColor: "transparent",
    color: "var(--app-text-muted)",
    border: "1px solid var(--app-control-border)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "transparent",
        backgroundColor: "transparent",
        borderColor: "var(--app-overlay-25)",
        color: "var(--app-text)",
        boxShadow: "none",
      },
    },
    "&.Mui-disabled": {
      bgcolor: "transparent",
      backgroundColor: "transparent",
      color: "var(--app-text-muted)",
      borderColor: "var(--app-control-border)",
      opacity: 0.45,
    },
  },

  skillDialogCancelButton: {
    ...pillButtonBase,
    width: "auto",
    minWidth: 160,
    height: 48,
    minHeight: 48,
    px: 4,
    py: 1.5,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.6,
    bgcolor: "transparent",
    backgroundColor: "transparent",
    color: "var(--app-text-muted)",
    border: "1px solid var(--app-control-border)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "transparent",
        backgroundColor: "transparent",
        borderColor: "var(--app-overlay-25)",
        color: "var(--app-text)",
        boxShadow: "none",
      },
    },
  },

  primaryButton: {
    ...pillButtonBase,
    width: "100%",
    height: { xs: 40, sm: 48 },
    minHeight: { xs: 40, sm: 48 },
    fontSize: 14,
    px: { xs: 2, sm: 3 },
    bgcolor: "var(--color-primary)",
    color: "var(--app-on-primary)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-hover)",
        boxShadow: "none",
      },
    },
  },

  skillDialogPrimaryButton: {
    ...pillButtonBase,
    width: "auto",
    minWidth: 160,
    height: 48,
    minHeight: 48,
    px: 4,
    py: 1.5,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.6,
    bgcolor: "var(--color-primary)",
    color: "var(--app-on-primary)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-hover)",
        boxShadow: "none",
      },
    },
  },

  skillDialogPrimaryButtonMuted: {
    ...pillButtonBase,
    width: "auto",
    minWidth: 160,
    height: 48,
    minHeight: 48,
    px: 4,
    py: 1.5,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.6,
    bgcolor: "var(--app-overlay-25)",
    color: "var(--app-text-muted)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--app-overlay-25)",
        boxShadow: "none",
      },
    },
    "&.Mui-disabled": {
      bgcolor: "var(--app-overlay-25)",
      color: "var(--app-text-muted)",
    },
  },

  secondaryButton: {
    borderRadius: "24px",
    bgcolor: "var(--app-overlay-20)",
    color: "var(--app-on-primary)",
    px: 3,
    textTransform: "uppercase",
    ...labelTypography,
    boxShadow: "none",
  },

  primaryButtonMuted: {
    ...pillButtonBase,
    width: "100%",
    height: { xs: 40, sm: 48 },
    minHeight: { xs: 40, sm: 48 },
    fontSize: 14,
    px: { xs: 2, sm: 3 },
    bgcolor: "var(--app-overlay-25)",
    color: "var(--app-text-muted)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--app-overlay-25)",
        boxShadow: "none",
      },
    },
    "&.Mui-disabled": {
      bgcolor: "var(--app-overlay-25)",
      color: "var(--app-text-muted)",
    },
  },

  selectMenuPaper: {
    bgcolor: "var(--app-dialog-surface)",
    "& .MuiMenuItem-root": {
      color: "var(--app-text)",
    },
  },

  skillSelectField: {
    position: "relative",
  },

  skillSelectControl: {
    "& .MuiSelect-select.MuiSelect-select": {
      pr: 7,
      fontSize: 15,
      lineHeight: 1.5,
    },
    "& .MuiSelect-icon": {
      color: "var(--app-text-muted)",
    },
  },

  skillSelectClear: {
    position: "absolute",
    right: 36,
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--app-text-muted)",
    zIndex: 1,
    p: 0.5,
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--app-text)",
      },
    },
  },

  skillSelectMenuPaper: {
    bgcolor: "var(--app-dialog-surface)",
    color: "var(--app-text)",
    borderRadius: 0,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
    overflow: "hidden",
    "& .MuiList-root, & .MuiMenu-list": {
      p: 0,
      maxHeight: 320,
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "var(--app-overlay-35) transparent",
      "&::-webkit-scrollbar": {
        width: 6,
      },
      "&::-webkit-scrollbar-track": {
        bgcolor: "transparent",
        my: 0.5,
      },
      "&::-webkit-scrollbar-thumb": {
        bgcolor: "var(--app-overlay-35)",
        borderRadius: 9999,
        minHeight: 40,
      },
      "@media (hover: hover)": {
        "&::-webkit-scrollbar-thumb:hover": {
          bgcolor: "var(--app-text-muted)",
        },
      },
    },
    "& .MuiMenuItem-root": {
      fontSize: 15,
      lineHeight: 1.5,
      py: 1.5,
      px: 2,
      color: "var(--app-text)",
      "&:hover": {
        bgcolor: "var(--app-overlay-12)",
      },
      "&.Mui-selected": {
        bgcolor: "var(--app-overlay-12)",
        "&:hover": {
          bgcolor: "var(--app-overlay-20)",
        },
      },
    },
  },

  skillSelectGroupLabel: {
    bgcolor: "var(--app-dialog-surface)",
    color: "var(--color-primary)",
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 1.5,
    py: 1.25,
    px: 2,
    position: "static",
  },

  skillSelectOption: {
    minHeight: 44,
  },

  /** Outlined inputs inside dialogs and details form */
  formField: {
    "& .MuiInputLabel-root": {
      color: "var(--app-text-muted)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "var(--color-primary)",
    },
    "& .MuiInputLabel-root.Mui-disabled": {
      color: "var(--app-text-muted)",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      color: "var(--app-text)",
      "& .MuiOutlinedInput-input": {
        color: "var(--app-text)",
      },
      "& fieldset": {
        borderColor: "var(--app-control-border)",
      },
      "&:hover fieldset": {
        borderColor: "var(--app-overlay-20)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--color-primary)",
      },
      "&.Mui-disabled": {
        "& .MuiOutlinedInput-input": {
          color: "var(--app-text)",
          WebkitTextFillColor: "var(--app-text)",
          opacity: 1,
        },
        "& fieldset": {
          borderColor: "var(--app-control-border)",
        },
      },
    },
    "& .MuiFormHelperText-root": {
      color: "var(--app-text-muted)",
      minHeight: 20,
      lineHeight: "20px",
      margin: 0,
      mt: 0.5,
      display: "block",
    },
    "& .MuiSelect-icon": {
      color: "var(--app-text-muted)",
    },
  },

  /** Create CV dialog inputs — compact mock × 1.5. */
  formFieldCompact: {
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-input": {
        py: 1.875,
      },
    },
    "& .MuiOutlinedInput-root.MuiInputBase-multiline": {
      py: 1.125,
    },
    "& .MuiFormHelperText-root": {
      minHeight: 0,
      mt: 0.375,
    },
  },

  /** Multiline CV fields — hide scrollbars (details + create). */
  formFieldMultiline: {
    "& .MuiOutlinedInput-root": {
      alignItems: "flex-start",
      py: 1,
    },
    "& textarea": {
      overflow: "auto",
      resize: "none",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
        width: 0,
        height: 0,
      },
    },
  },

  /** Read-only / disabled field (e.g. skill name on update dialog). */
  formFieldLocked: {
    "& .MuiInputLabel-root": {
      color: "var(--app-text-muted)",
      opacity: 0.65,
    },
    "& .MuiInputLabel-root.Mui-disabled": {
      color: "var(--app-text-muted)",
      opacity: 0.65,
    },
    "& .MuiOutlinedInput-root": {
      bgcolor: "var(--app-overlay-06)",
      cursor: "default",
      "& .MuiOutlinedInput-input": {
        color: "var(--app-text-muted)",
        WebkitTextFillColor: "var(--app-text-muted)",
        opacity: 0.75,
        cursor: "default",
      },
      "& fieldset": {
        borderColor: "var(--app-overlay-12)",
      },
      "&:hover fieldset": {
        borderColor: "var(--app-overlay-12)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--app-overlay-12)",
      },
      "&.Mui-disabled": {
        bgcolor: "var(--app-overlay-06)",
        "& .MuiOutlinedInput-input": {
          color: "var(--app-text-muted)",
          WebkitTextFillColor: "var(--app-text-muted)",
          opacity: 0.75,
        },
        "& fieldset": {
          borderColor: "var(--app-overlay-12)",
        },
      },
    },
  },

  // ---------------------------------------------------------------------------
  // CV shell — layout for all `/cvs/[id]/*` tabs (cv-shell)
  // ---------------------------------------------------------------------------

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 0.5,
    mb: 2,
    fontSize: 14,
    color: "var(--app-text-muted)",
  },

  breadcrumbLink: {
    color: "inherit",
    textDecoration: "none",
  },

  breadcrumbArrow: {
    mx: 0.75,
    opacity: 0.65,
    verticalAlign: "middle",
  },

  breadcrumbActive: {
    color: "#df4d4d",
  },

  tabs: {
    width: "100%",
    mb: 5,
    minHeight: 40,
    height: 40,
    "& .MuiTabs-flexContainer": {
      height: 40,
      gap: 0,
    },
    "& .MuiTabs-scroller": {
      height: 40,
    },
    "& .MuiTab-root": {
      color: "var(--app-text-muted)",
      fontSize: 13,
      lineHeight: "20px",
      fontWeight: 600,
      letterSpacing: 0,
      textTransform: "uppercase",
      minHeight: 40,
      height: 40,
      minWidth: "auto",
      px: 2,
      py: 0,
      opacity: 1,
      textDecoration: "none",
      "@media (hover: hover)": {
        "&:hover": {
          color: "#df4d4d",
        },
      },
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#df4d4d",
    },
    "& .MuiTab-root.Mui-selected:hover": {
      color: "#df4d4d",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#df4d4d",
      height: 2,
      borderRadius: 0,
    },
  },

  tabContent: {
    width: "100%",
    pt: 0,
  },

  // ---------------------------------------------------------------------------
  // Details tab — `/cvs/[id]` (cv-details-page)
  // ---------------------------------------------------------------------------

  detailsForm: {
    width: "100%",
    maxWidth: 720,
  },

  detailsFormStack: {
    gap: "20px",
    width: "100%",
  },

  /** Field spacing inside Create CV dialog (12px × 1.5). */
  detailsFormStackCompact: {
    gap: "18px",
    width: "100%",
  },

  detailsFormAlert: {
    mt: 2,
    width: "100%",
  },

  detailsFormActions: {
    mt: 2,
    width: "100%",
    justifyContent: "flex-end",
    "& > .MuiButton-root": {
      width: { xs: "100%", sm: "auto" },
      minWidth: { xs: 0, sm: 160 },
      maxWidth: { sm: 410 },
      flex: { xs: "1 1 0", sm: "0 0 auto" },
    },
  },

  dialogCreateCvActions: {
    mt: 3,
    width: "100%",
    justifyContent: "flex-end",
    gap: 1.5,
    "& > .MuiButton-root": {
      width: "auto",
      minWidth: { xs: 180, sm: 210 },
      maxWidth: { sm: 300 },
      flex: "0 0 auto",
      mt: 0,
    },
  },

  dialogCreateCvCancelButton: {
    ...dialogCreateCvButtonBase,
    bgcolor: "transparent",
    backgroundColor: "transparent",
    color: "var(--app-text-muted)",
    border: "1px solid var(--app-control-border)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "transparent",
        backgroundColor: "transparent",
        borderColor: "var(--app-overlay-25)",
        color: "var(--app-text)",
        boxShadow: "none",
      },
    },
    "&.Mui-disabled": {
      bgcolor: "transparent",
      backgroundColor: "transparent",
      color: "var(--app-text-muted)",
      borderColor: "var(--app-control-border)",
      opacity: 0.45,
    },
  },

  dialogCreateCvCreateButton: {
    ...dialogCreateCvButtonBase,
  },

  updateButton: {
    ...pillButtonBase,
    alignSelf: "flex-end",
    width: "100%",
    maxWidth: { xs: "100%", sm: 410 },
    height: { xs: 40, sm: 48 },
    minHeight: { xs: 40, sm: 48 },
    fontSize: { xs: 11, sm: 12 },
    mt: 2,
    px: { xs: 3, sm: 4 },
  },

  updateButtonActive: {
    bgcolor: "var(--color-primary)",
    color: "var(--app-on-primary)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-hover)",
        boxShadow: "none",
      },
    },
    "&.Mui-disabled": {
      bgcolor: "var(--color-primary)",
      color: "var(--app-on-primary)",
      opacity: 0.7,
    },
  },

  updateButtonMuted: {
    bgcolor: "var(--app-overlay-25)",
    color: "var(--app-text-muted)",
    "&.Mui-disabled": {
      bgcolor: "var(--app-overlay-25)",
      color: "var(--app-text-muted)",
      opacity: 1,
    },
  },

  // ---------------------------------------------------------------------------
  // Skills tab — `/cvs/[id]/skills` (cv-skills-page, cv-skill-row, skill-mastery-bar)
  // ---------------------------------------------------------------------------

  skillsSection: {
    display: "flex",
    flexDirection: "column",
    minHeight: 280,
  },

  skillsSectionRemove: {
    flexDirection: "column",
  },

  skillsSectionEmpty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },

  /** Full-width CTA when the skills list is empty. */
  addSkillEmptyButton: {
    ...pillButtonBase,
    width: "100%",
    maxWidth: "100%",
    px: 4,
    bgcolor: "transparent",
    backgroundColor: "transparent",
    color: "var(--app-text-muted)",
    border: "1px solid var(--app-control-border)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "transparent",
        backgroundColor: "transparent",
        borderColor: "var(--app-overlay-25)",
        color: "var(--app-text)",
        boxShadow: "none",
      },
    },
  },

  skillsList: {
    flex: "1 1 auto",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  skillCategoryBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  skillCategoryTitle: {
    fontSize: 16,
    fontWeight: 400,
    color: "var(--app-text)",
    lineHeight: 1.4,
    m: 0,
  },

  skillsGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, minmax(0, 1fr))",
      lg: "repeat(3, minmax(0, 1fr))",
    },
    gap: 2,
    alignItems: "center",
  },

  skillListItem: {
    minWidth: 0,
    display: "flex",
    justifyContent: "flex-start",
  },

  skillRow: {
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    maxWidth: "100%",
    minWidth: 0,
    height: 48,
    minHeight: 48,
    px: 1.5,
    py: 1,
    border: "2px solid transparent",
    borderRadius: 999,
    boxSizing: "border-box",
    transition: "background-color 200ms, color 200ms, border-color 0.2s ease",
  },

  skillRowRemovable: {
    cursor: "pointer",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "rgba(255, 255, 255, 0.06)",
        "& .MuiTypography-root": {
          color: "var(--app-text)",
        },
      },
    },
  },

  skillRowEditable: {
    cursor: "pointer",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "rgba(255, 255, 255, 0.06)",
        "& .MuiTypography-root": {
          color: "var(--app-text)",
        },
      },
    },
  },

  skillRowSelected: {
    pointerEvents: "auto",
    borderColor: "#df4d4d",
    bgcolor: "rgba(223, 77, 77, 0.12)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "rgba(223, 77, 77, 0.16)",
      },
    },
  },

  skillBarGroup: {
    display: "inline-grid",
    gridTemplateColumns: "120px auto",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
    width: "fit-content",
    maxWidth: "100%",
  },

  skillBarTrack: {
    width: "100%",
    minWidth: 120,
    height: 6,
    borderRadius: 3,
    flexShrink: 0,
    bgcolor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },

  skillBarFill: {
    height: "100%",
    borderRadius: 3,
    transition: "width 0.45s ease-in-out",
  },

  skillName: {
    fontSize: 14,
    fontWeight: 400,
    color: "var(--app-text-muted)",
    lineHeight: 1.5,
    transition: "color 0.35s ease, opacity 0.35s ease",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  skillNameDimmed: {
    opacity: 0.45,
  },

  skillRemoveActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: { xs: "center", sm: "flex-end" },
    alignItems: "center",
    gap: 3,
    flexWrap: "wrap",
    flexShrink: 0,
    width: "100%",
    mt: "auto",
    pt: 3,
    pr: { xs: 0, sm: 2 },
    pl: 0,
  },

  skillRemoveCancelButton: {
    ...pillButtonBase,
    width: "auto",
    minWidth: 160,
    height: 48,
    minHeight: 48,
    px: 4,
    py: 1.5,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.6,
    bgcolor: "transparent",
    color: "var(--app-text-muted)",
    border: "1px solid var(--app-control-border)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "transparent",
        borderColor: "var(--app-overlay-25)",
        color: "var(--app-text)",
        boxShadow: "none",
      },
    },
  },

  skillRemoveDeleteButton: {
    ...pillButtonBase,
    width: "auto",
    minWidth: 160,
    maxWidth: 220,
    height: 48,
    minHeight: 48,
    px: 4,
    py: 1.5,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.6,
    bgcolor: "var(--app-overlay-25)",
    color: "var(--app-text-muted)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--app-overlay-25)",
        boxShadow: "none",
      },
    },
    "&.Mui-disabled": {
      bgcolor: "var(--app-overlay-25)",
      color: "var(--app-text-muted)",
      opacity: 1,
    },
  },

  skillRemoveDeleteButtonActive: {
    bgcolor: "var(--color-primary)",
    color: "var(--app-on-primary)",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-hover)",
        boxShadow: "none",
      },
    },
    "&.Mui-disabled": {
      bgcolor: "var(--app-overlay-25)",
      color: "var(--app-text-muted)",
      opacity: 1,
    },
  },

  skillRemoveDeleteLabel: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.25,
    minHeight: 22,
    width: "100%",
  },

  skillRemoveDeleteBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    flexShrink: 0,
    width: 32,
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    p: 0,
    borderRadius: "50%",
    bgcolor: "var(--app-on-primary)",
    color: "var(--color-primary)",
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: 0,
  },

  skillRemoveDeleteBadgeHidden: {
    visibility: "hidden",
    opacity: 0,
  },

  skillActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: { xs: "center", sm: "flex-end" },
    width: "100%",
    mt: "auto",
    pt: 3,
    pr: { xs: 0, sm: 2 },
    gap: 3,
    flexWrap: "wrap",
  },

  skillActionsGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  /** Footer text buttons on skills tab (ADD SKILL, REMOVE, etc.) */
  textActionMuted: {
    color: "var(--app-text-muted)",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 500,
    minWidth: 0,
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--app-overlay-06)",
      },
    },
  },

  textActionLight: {
    color: "var(--app-text)",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
    px: 0,
    minWidth: 0,
    "& .MuiButton-startIcon": {
      color: "inherit",
    },
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "transparent",
      },
    },
  },

  textActionPrimary: {
    color: "#df4d4d",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
    px: 0,
    minWidth: 0,
    "& .MuiButton-startIcon": {
      color: "inherit",
    },
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "transparent",
        color: "#ef6d6d",
      },
    },
  },

  textActionDanger: {
    color: "var(--color-action-danger)",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
    px: 0,
    minWidth: 0,
    "& .MuiButton-startIcon": {
      color: "inherit",
    },
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "rgba(217, 83, 79, 0.08)",
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Projects tab — `/cvs/[id]/projects` (cv-projects-page, cv-project-card)
  // ---------------------------------------------------------------------------

  projectsToolbar: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "stretch", sm: "center" },
    justifyContent: "space-between",
    gap: 2,
    width: "100%",
    pt: 1,
    mb: 2,
  },

  projectsToolbarSearch: {
    flex: { xs: "1 1 auto", sm: "0 1 auto" },
    minWidth: 0,
    width: { xs: "100%", sm: "auto" },
  },

  projectsToolbarActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "flex-end", sm: "flex-end" },
    flexShrink: 0,
  },

  /** Shared column layout for projects header + rows (even 24px gaps). */
  projectsGrid: {
    display: "grid",
    width: "100%",
    alignItems: "center",
    columnGap: 3,
    gridTemplateColumns:
      "minmax(0, 2fr) minmax(0, 1.5fr) minmax(112px, 1fr) minmax(112px, 1fr) 40px",
  },

  projectsTableScroll: {
    width: "100%",
    minWidth: 0,
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "thin",
    scrollbarColor: "var(--app-overlay-35) transparent",
    "&::-webkit-scrollbar": {
      height: 6,
    },
    "&::-webkit-scrollbar-thumb": {
      bgcolor: "var(--app-overlay-35)",
      borderRadius: 3,
    },
  },

  projectsTableInner: {
    width: "100%",
    minWidth: 720,
  },

  projectsHeaderRow: {
    display: "grid",
    width: "100%",
    alignItems: "center",
    columnGap: 3,
    gridTemplateColumns:
      "minmax(0, 2fr) minmax(0, 1.5fr) minmax(112px, 1fr) minmax(112px, 1fr) 40px",
    height: 56,
    minHeight: 56,
    py: 0,
    boxSizing: "border-box",
    borderBottom: "1px solid var(--app-divider)",
    color: "var(--app-text)",
    fontSize: 14,
    lineHeight: "24px",
    fontWeight: 500,
    letterSpacing: "0.15px",
    "& .MuiTableSortLabel-root": {
      whiteSpace: "nowrap",
    },
  },

  projectsList: {
    width: "100%",
  },

  projectGridCell: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  projectGridActions: {
    display: "flex",
    justifyContent: "flex-end",
    width: 40,
    flexShrink: 0,
  },

  projectsEmptyResults: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: { xs: 200, md: 320 },
    color: "var(--app-text-muted)",
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.15px",
    textTransform: "none",
  },

  projectCard: {
    borderBottom: "1px solid var(--app-divider)",
    py: 2.5,
  },

  projectTitle: {
    fontWeight: 500,
    color: "var(--app-text)",
  },

  projectMeta: {
    color: "var(--app-text-muted)",
    fontSize: 14,
    lineHeight: "24px",
  },

  projectChips: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    mt: 1.5,
  },

  projectChip: {
    bgcolor: "var(--app-overlay-12)",
    color: "var(--app-text-muted)",
    fontSize: 12,
    maxWidth: 280,
    "& .MuiChip-label": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },

  // ---------------------------------------------------------------------------
  // Preview tab — `/cvs/[id]/preview` (cv-preview-page)
  // Light “resume” layout on white paper; distinct from dark dashboard theme.
  // ---------------------------------------------------------------------------

  previewToolbar: {
    mb: 2,
    justifyContent: { xs: "stretch", sm: "flex-end" },
  },

  exportButton: {
    ...pillButtonBase,
    width: { xs: "100%", sm: "auto" },
    minWidth: { sm: 160 },
    height: { xs: 40, sm: 48 },
    minHeight: { xs: 40, sm: 48 },
    fontSize: { xs: 11, sm: 12 },
    px: { xs: 3, sm: 4 },
    borderColor: "var(--color-primary)",
    color: "var(--color-primary)",
    border: "1px solid var(--color-primary)",
    bgcolor: "transparent",
    "@media (hover: hover)": {
      "&:hover": {
        borderColor: "var(--color-primary-hover)",
        color: "var(--color-primary-hover)",
        bgcolor: "var(--color-primary-subtle)",
      },
    },
  },

  previewPaper: {
    bgcolor: "#ffffff",
    color: "#1f1f1f",
    p: { xs: 2, sm: 3 },
    maxWidth: 852,
    width: "100%",
    overflow: "hidden",
    mx: "auto",
    boxSizing: "border-box",
  },

  previewDocument: {
    width: "100%",
    maxWidth: 852,
  },

  previewHero: {
    mb: 4,
  },

  previewHeroName: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: { xs: 26, sm: 32 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: "#1f1f1f",
    mb: 0.5,
  },

  previewHeroSubtitle: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    color: "#666666",
  },

  previewTableScroll: {
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  },

  previewSplitGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "260px minmax(0, 1fr)" },
    columnGap: { xs: 0, md: 0 },
    mb: 5,
  },

  previewSidebar: {
    minWidth: 0,
  },

  previewMainColumn: {
    borderLeft: { xs: "none", md: "1px solid var(--color-primary)" },
    pl: { xs: 0, md: 3 },
    pt: { xs: 2, md: 0 },
    borderTop: { xs: "1px solid var(--color-primary)", md: "none" },
    minWidth: 0,
  },

  previewSummaryHeadline: {
    fontSize: 14,
    fontWeight: 500,
    color: "#1f1f1f",
    mb: 1.5,
  },

  previewBlockTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: "#1f1f1f",
    mb: 1,
  },

  previewBodyText: {
    fontSize: 14,
    color: "#1f1f1f",
    lineHeight: 1.5,
    mb: 2,
  },

  previewSkillBlock: {
    mb: 2.5,
  },

  previewSkillLine: {
    fontSize: 14,
    color: "#1f1f1f",
    m: 0,
    mb: 0.5,
  },

  previewSectionHeading: {
    fontSize: { xs: 18, sm: 22 },
    fontWeight: 400,
    color: "#1f1f1f",
    mb: 2,
  },

  previewSkillsTableSection: {
    mb: 5,
  },

  previewSkillsTable: {
    width: "100%",
    minWidth: { xs: 480, sm: "100%" },
    borderCollapse: "collapse",
    "& thead th": {
      textAlign: "left",
      fontSize: { xs: 10, sm: 11 },
      fontWeight: 500,
      letterSpacing: "0.4px",
      textTransform: "uppercase",
      color: "#666666",
      pb: 1,
      borderBottom: "1px solid var(--color-primary)",
    },
    "& tbody td": {
      fontSize: { xs: 12, sm: 13 },
      color: "#1f1f1f",
      py: 1.5,
      pr: { xs: 1, sm: 2 },
      borderBottom: "1px solid #e8e8e8",
      verticalAlign: "top",
    },
    "& .col-narrow": {
      width: { xs: 88, sm: 140 },
      whiteSpace: "nowrap",
    },
  },

  previewSkillCategory: {
    color: "var(--color-primary)",
    fontWeight: 500,
  },

  previewProjectsSection: {
    mt: 1,
  },

  previewProjectBlock: {
    mb: 4,
  },

  previewProjectGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "260px minmax(0, 1fr)" },
    columnGap: 0,
  },

  previewProjectSidebar: {
    minWidth: 0,
  },

  previewProjectRight: {
    borderLeft: { xs: "none", md: "1px solid var(--color-primary)" },
    pl: { xs: 0, md: 3 },
    pt: { xs: 2, md: 0 },
    borderTop: { xs: "1px solid var(--color-primary)", md: "none" },
    minWidth: 0,
  },

  previewProjectName: {
    fontSize: 14,
    fontWeight: 500,
    color: "var(--color-primary)",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    mb: 1.5,
  },

  previewProjectDescription: {
    fontSize: 14,
    color: "#1f1f1f",
    lineHeight: 1.6,
    mb: 0,
  },

  previewMetaBlock: {
    mb: 1.5,
  },

  previewMetaLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: "#1f1f1f",
    display: "block",
    mb: 0.25,
  },

  previewMetaValue: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 1.5,
  },

  previewResponsibilityList: {
    m: 0,
    pl: 2.5,
    color: "#666666",
    fontSize: 13,
    "& li": {
      mb: 0.5,
    },
    "& li::marker": {
      color: "var(--color-primary)",
    },
  },
} satisfies Record<string, SxProps<Theme>>;
