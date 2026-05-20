import type { SxProps, Theme } from "@mui/material/styles";

const AUTH_PANEL_WIDTH = 560;
const AUTH_PANEL_HEIGHT = 844;
const AUTH_CONTENT_WIDTH = 220;
const AUTH_FIELD_WIDTH = AUTH_PANEL_WIDTH;
const AUTH_FIELD_HEIGHT = 48;
const AUTH_BUTTON_RADIUS = "40px";
const AUTH_FIELD_BORDER_WIDTH = 1;
const AUTH_FIELD_GAP = 20;
const AUTH_HEADER_TO_FIELDS_GAP = 40;
const AUTH_FIELDS_TO_BUTTON_GAP = 40;

export const authFormStyles = {
  pageContainer: {
    minHeight: "100dvh",
    height: "100dvh",
    width: "100%",
    maxWidth: "100vw",
    bgcolor: "var(--app-surface)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    pt: 0,
    boxSizing: "border-box",
    overflow: "hidden",
  },

  gateContent: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  gateMessage: {
    fontSize: 14,
    color: "var(--app-text-muted)",
    textAlign: "center",
  },

  authPanel: {
    width: {
      xs: `min(${AUTH_PANEL_WIDTH}px, 100%)`,
      md: AUTH_PANEL_WIDTH,
    },
    maxWidth: AUTH_PANEL_WIDTH,
    height: `min(${AUTH_PANEL_HEIGHT}px, 100dvh)`,
    pt: 0,
    mt: 0,
    px: {
      xs: 2.5,
      md: 0,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    overflow: "hidden",
    flexShrink: 0,
    boxSizing: "border-box",
  },

  form: {
    width: "100%",
    height: "100%",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    overflow: "hidden",
    pt: 0,
    mt: 0,
  },

  tabs: {
    width: "100%",
    height: AUTH_FIELD_HEIGHT,
    minHeight: AUTH_FIELD_HEIGHT,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 6,
    m: 0,
    mt: 0,
    pt: 0,
    mb: "169px",
    flexShrink: 0,
    "& .MuiButton-root": {
      m: 0,
    },
  },

  tab: {
    width: 150,
    height: AUTH_FIELD_HEIGHT,
    minWidth: 150,
    minHeight: AUTH_FIELD_HEIGHT,
    py: 0,
    pb: 0,
    px: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    color: "var(--app-text)",
    borderRadius: 0,
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    borderBottom: "2px solid transparent",
    transition: "color 0.2s, border-color 0.2s",
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--app-text)",
        bgcolor: "transparent",
      },
    },
  },

  activeTab: {
    color: "var(--color-primary)",
    borderBottomColor: "var(--color-primary)",
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--color-primary)",
        bgcolor: "transparent",
      },
    },
  },

  formBody: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0,
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    "& > .MuiTextField-root + .MuiTextField-root": {
      mt: `${AUTH_FIELD_GAP}px`,
    },
  },

  formBodyStandalone: {
    pt: "217px",
  },

  headerText: {
    width: "100%",
    textAlign: "center",
    mb: `${AUTH_HEADER_TO_FIELDS_GAP}px`,
    flexShrink: 0,
  },

  title: {
    fontSize: 32,
    fontWeight: 400,
    lineHeight: "40px",
    color: "var(--app-text)",
    mb: 2.75,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 1.45,
    color: "var(--app-text-muted)",
  },

  textField: {
    width: AUTH_FIELD_WIDTH,
    maxWidth: "100%",
    "& .MuiInputBase-root": {
      height: AUTH_FIELD_HEIGHT,
      bgcolor: "transparent",
      fontSize: 16,
      lineHeight: "23px",
      color: "var(--app-text)",
    },
    "& .MuiOutlinedInput-root": {
      height: AUTH_FIELD_HEIGHT,
      borderRadius: 0,
      overflow: "hidden",
      "& fieldset": {
        borderWidth: AUTH_FIELD_BORDER_WIDTH,
        borderColor: "var(--app-control-border)",
        borderRadius: 0,
      },
      "@media (hover: hover)": {
        "&:hover fieldset": {
          borderWidth: AUTH_FIELD_BORDER_WIDTH,
          borderColor: "var(--app-text-muted)",
        },
      },
      "&.Mui-focused fieldset": {
        borderWidth: AUTH_FIELD_BORDER_WIDTH,
        borderColor: "var(--app-text)",
      },
    },
    "& .MuiInputBase-input": {
      height: AUTH_FIELD_HEIGHT,
      padding: "0 16px",
      boxSizing: "border-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& .MuiInputBase-inputAdornedEnd": {
      paddingRight: "44px",
    },
    "& .MuiFormHelperText-root": {
      maxWidth: "100%",
      overflowWrap: "anywhere",
    },
    "& input::placeholder": {
      color: "var(--app-text)",
      opacity: 0.7,
    },
    "& .MuiIconButton-root": {
      color: "var(--app-text)",
      p: 0,
      mr: 0.5,
      "@media (hover: hover)": {
        "&:hover": {
          bgcolor: "transparent",
        },
      },
    },
    "& .MuiSvgIcon-root": {
      fontSize: 24,
    },
  },

  submitButton: {
    width: AUTH_CONTENT_WIDTH,
    maxWidth: "100%",
    height: AUTH_FIELD_HEIGHT,
    mt: `${AUTH_FIELDS_TO_BUTTON_GAP}px`,
    alignSelf: "center",
    flexShrink: 0,
    borderRadius: AUTH_BUTTON_RADIUS,
    bgcolor: "var(--color-primary)",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "17.5px",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    boxShadow: "none",
    transition: "background-color 0.2s, transform 0.1s",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--color-primary-hover)",
        boxShadow: "none",
      },
    },
    "&:active": {
      transform: "scale(0.98)",
    },
  },

  textAction: {
    mt: 1.75,
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    color: "var(--app-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    textDecoration: "none",
    transition: "color 0.2s",
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--app-text)",
      },
    },
  },

  formAlert: {
    width: AUTH_FIELD_WIDTH,
    maxWidth: "100%",
    mt: `${AUTH_FIELD_GAP}px`,
  },
} satisfies Record<string, SxProps<Theme>>;
