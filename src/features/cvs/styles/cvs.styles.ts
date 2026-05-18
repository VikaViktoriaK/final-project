import type { SxProps, Theme } from "@mui/material/styles";

export const cvsStyles = {
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    py: 8,
  },

  pageTitle: {
    fontSize: { xs: 28, md: 32 },
    fontWeight: 400,
    color: "var(--app-text)",
    mb: 3,
  },

  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    flexWrap: "wrap",
    mb: 3,
  },

  pageHeaderSpacer: {
    flex: 1,
  },

  searchField: {
    maxWidth: 360,
    width: "100%",
    mx: { md: "auto" },
    "& .MuiOutlinedInput-root": {
      borderRadius: "24px",
      bgcolor: "var(--app-control-bg)",
      color: "var(--app-text)",
      "& fieldset": {
        borderColor: "var(--app-control-border)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--app-text-muted)",
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: "var(--app-text-muted)",
      opacity: 1,
    },
  },

  searchFieldCompact: {
    maxWidth: 280,
    mx: 0,
  },

  searchIcon: {
    color: "var(--app-text-muted)",
  },

  createButton: {
    color: "var(--color-primary)",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-subtle)",
      },
    },
  },

  textMuted: {
    color: "var(--app-text-muted)",
  },

  emptyState: {
    color: "var(--app-text-muted)",
    fontSize: 14,
    py: 2,
  },

  table: {
    "& .MuiTableCell-root": {
      color: "var(--app-text)",
    },
  },

  tableHeadCell: {
    color: "var(--app-text-muted)",
    fontSize: 12,
    fontWeight: 500,
    borderBottom: "1px solid var(--app-divider)",
    py: 1.5,
  },

  tableSortLabel: {
    color: "inherit !important",
  },

  tableRow: {
    "& td": {
      borderBottom: "1px solid var(--app-divider)",
      verticalAlign: "top",
    },
  },

  tableDescriptionCell: {
    pt: 0,
    borderBottom: "1px solid var(--app-divider)",
  },

  menuIconButton: {
    color: "var(--app-text-muted)",
  },

  menuItemDanger: {
    color: "var(--color-primary)",
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

  dialog: {
    "& .MuiDialog-paper": {
      bgcolor: "var(--app-dialog-surface)",
      color: "var(--app-text)",
      borderRadius: 2,
      minWidth: { xs: "90vw", sm: 480 },
    },
  },

  dialogTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 18,
    fontWeight: 500,
    pb: 1,
  },

  dialogContent: {
    pt: 1,
  },

  dialogActions: {
    px: 3,
    pb: 3,
    pt: 1,
    gap: 1.5,
    justifyContent: "flex-end",
  },

  dialogMessage: {
    color: "var(--app-text-muted)",
    fontSize: 14,
  },

  confirmHighlight: {
    color: "var(--app-text)",
  },

  cancelButton: {
    borderRadius: "24px",
    borderColor: "var(--app-control-border)",
    color: "var(--app-text-muted)",
    px: 3,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
  },

  primaryButton: {
    borderRadius: "24px",
    bgcolor: "var(--color-primary)",
    color: "var(--app-on-primary)",
    px: 3,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
    boxShadow: "none",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-hover)",
        boxShadow: "none",
      },
    },
  },

  secondaryButton: {
    borderRadius: "24px",
    bgcolor: "var(--app-overlay-20)",
    color: "var(--app-on-primary)",
    px: 3,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
    boxShadow: "none",
  },

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

  breadcrumbActive: {
    color: "var(--color-primary)",
  },

  tabs: {
    borderBottom: "1px solid var(--app-divider)",
    mb: 3,
    minHeight: 40,
    "& .MuiTab-root": {
      color: "var(--app-text-muted)",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.08em",
      minHeight: 40,
      py: 1,
    },
    "& .Mui-selected": {
      color: "var(--color-primary)",
    },
    "& .MuiTabs-indicator": {
      bgcolor: "var(--color-primary)",
    },
  },

  detailsForm: {
    maxWidth: 720,
  },

  formField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      color: "var(--app-text)",
      "& fieldset": {
        borderColor: "var(--app-control-border)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--color-primary)",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "var(--color-primary)",
    },
  },

  updateButton: {
    alignSelf: "flex-end",
    borderRadius: "24px",
    bgcolor: "var(--app-overlay-25)",
    color: "var(--app-on-primary)",
    px: 4,
    py: 1.25,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
    mt: 2,
    boxShadow: "none",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--app-overlay-35)",
        boxShadow: "none",
      },
    },
  },

  skillCategoryTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--app-text)",
    mb: 1.5,
    mt: 3,
  },

  skillRow: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 1.25,
  },

  skillBarGroup: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },

  skillCheckbox: {
    color: "var(--app-text-muted)",
  },

  skillBar: {
    width: 120,
    height: 4,
    borderRadius: 2,
    bgcolor: "var(--app-overlay-12)",
    overflow: "hidden",
    flexShrink: 0,
  },

  skillBarFill: {
    height: "100%",
    borderRadius: 2,
  },

  skillName: {
    fontSize: 14,
    color: "var(--app-text-muted)",
  },

  skillActions: {
    mt: 4,
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },

  textActionMuted: {
    color: "var(--app-text-muted)",
    textTransform: "uppercase",
    fontSize: 12,
  },

  textActionPrimary: {
    color: "var(--color-primary)",
    textTransform: "uppercase",
    fontSize: 12,
  },

  projectsToolbar: {
    mb: 3,
    gap: 2,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },

  projectsHeaderRow: {
    mb: 2,
    color: "var(--app-text-muted)",
    fontSize: 12,
  },

  projectHeaderName: {
    flex: 2,
  },

  projectHeaderDomain: {
    flex: 1.5,
    color: "var(--app-text-muted)",
    fontSize: 14,
  },

  projectHeaderDate: {
    flex: 1,
    color: "var(--app-text-muted)",
    fontSize: 14,
  },

  projectHeaderActions: {
    width: 40,
  },

  projectCard: {
    borderBottom: "1px solid var(--app-divider)",
    py: 2.5,
  },

  projectRow: {
    alignItems: "flex-start",
  },

  projectTitle: {
    flex: 2,
    fontWeight: 500,
  },

  projectChips: {
    mt: 1.5,
    flexWrap: "wrap",
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

  previewHeader: {
    mb: 4,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  previewName: {
    fontWeight: 600,
    textTransform: "capitalize",
  },

  previewRole: {
    color: "var(--app-text-muted)",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    mt: 0.5,
  },

  exportButton: {
    borderRadius: "24px",
    borderColor: "var(--color-primary)",
    color: "var(--color-primary)",
    px: 3,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 700,
  },

  previewLayout: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
    gap: { xs: 3, md: 4 },
    position: "relative",
    "&::before": {
      content: '""',
      display: { xs: "none", md: "block" },
      position: "absolute",
      left: 240,
      top: 0,
      bottom: 0,
      width: "1px",
      bgcolor: "var(--color-primary)",
    },
  },

  previewSidebarTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--app-text)",
    mb: 0.5,
  },

  previewSidebarText: {
    fontSize: 13,
    color: "var(--app-text-muted)",
    mb: 2,
  },

  previewSummaryTitle: {
    fontWeight: 600,
    fontSize: 18,
    mb: 1,
  },

  previewSummaryBody: {
    color: "var(--app-text-muted)",
    lineHeight: 1.6,
    mb: 3,
  },

  previewSkillGroup: {
    mb: 2,
  },

  previewSkillGroupTitle: {
    fontWeight: 600,
    fontSize: 14,
    mb: 1,
  },

  previewSkillRow: {
    mb: 0.75,
    alignItems: "center",
  },

  previewProjectsSection: {
    mt: 4,
  },

  previewProjectsTitle: {
    fontWeight: 600,
    mb: 2,
  },

  previewProjectItem: {
    mb: 3,
  },

  previewProjectName: {
    fontWeight: 600,
  },

  previewProjectMeta: {
    color: "var(--app-text-muted)",
    fontSize: 13,
    mb: 1,
  },

  previewProjectDescription: {
    color: "var(--app-text-muted)",
    fontSize: 14,
    mb: 1,
  },

  previewResponsibilityList: {
    margin: 0,
    paddingLeft: 20,
    color: "var(--app-text-muted)",
  },

  previewResponsibilityItem: {
    marginBottom: 4,
  },
} satisfies Record<string, SxProps<Theme>>;
