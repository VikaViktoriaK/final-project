import type { SxProps, Theme } from "@mui/material/styles";

export const authFormStyles = {
  pageContainer: {
    minHeight: "100dvh",
    height: "100dvh",
    width: "100%",
    bgcolor: "var(--app-surface)",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
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

  formContainer: {
    width: "100%",
    flex: 1,
    minHeight: 0,
    maxWidth: {
      xs: "100%",
      md: 760,
    },
    px: {
      xs: 2.5,
      sm: 6,
      md: 8,
    },
    pt: {
      xs: 2,
      md: 3,
    },
    pb: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    overflowX: "hidden",
  },

  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: {
      xs: 5,
      sm: 6,
    },
    mb: {
      xs: 24,
      md: 24,
    },
  },

  tab: {
    width: 140,
    pb: 2,
    px: 0,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "16px",
    color: "var(--app-text)",
    borderRadius: 0,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    transition: "color 0.2s",
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--app-text)",
        bgcolor: "transparent",
      },
    },
  },

  activeTab: {
    color: "var(--color-primary)",
    borderBottom: "2px solid var(--color-primary)",
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--color-primary)",
        bgcolor: "transparent",
      },
    },
  },

  headerText: {
    textAlign: "center",
    mb: {
      xs: 3.5,
      md: 4.75,
    },
  },

  title: {
    fontSize: {
      xs: 26,
      md: 32,
    },
    fontWeight: 400,
    lineHeight: 1.2,
    color: "var(--app-text)",
    mb: {
      xs: 2.25,
      md: 2.75,
    },
  },

  subtitle: {
    fontSize: {
      xs: 12,
      md: 16,
    },
    lineHeight: 1.45,
    color: "var(--app-text)",
  },

  form: {
    width: "100%",
    maxWidth: 560,
    alignItems: "center",
    gap: {
      xs: 2,
      md: 2.25,
    },
  },

  centeredForm: {
    width: "100%",
    maxWidth: 560,
    alignItems: "center",
    gap: {
      xs: 2,
      md: 2.25,
    },
    mt: {
      xs: "22vh",
      md: "24vh",
    },
  },

  textField: {
    width: "100%",
    "& .MuiInputBase-root": {
      height: 48,
      bgcolor: "transparent",
      fontSize: 16,
      lineHeight: "23px",
      color: "var(--app-text)",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      "& fieldset": {
        borderColor: "var(--app-control-border)",
      },
      "@media (hover: hover)": {
        "&:hover fieldset": {
          borderColor: "var(--app-text-muted)",
        },
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--app-text)",
      },
    },
    "& .MuiInputBase-input": {
      height: "23px",
      padding: "12.5px 44px 12.5px 12px",
      boxSizing: "content-box",
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
    width: 220,
    height: 48,
    mt: {
      xs: 3,
      md: 4.75,
    },
    borderRadius: "40px",
    bgcolor: "var(--color-primary)",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: "23px",
    textTransform: "uppercase",
    letterSpacing: 0,
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
    mt: {
      xs: 1.25,
      md: 1.75,
    },
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "16px",
    color: "var(--app-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textDecoration: "none",
    transition: "color 0.2s",
    "@media (hover: hover)": {
      "&:hover": {
        color: "var(--app-text)",
      },
    },
  },
} satisfies Record<string, SxProps<Theme>>;
