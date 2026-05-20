import { createTheme } from "@mui/material/styles";

/** Shared uppercase label (tabs, pill buttons, column headers). */
export const labelTypography = {
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "17.5px",
  letterSpacing: "0.4px",
} as const;

const appText = "rgba(255, 255, 255, 0.92)";
const appTextMuted = "rgba(255, 255, 255, 0.68)";
const appSurface = "#353535";
const appDialogSurface = "#2a2a2a";
const appDivider = "rgba(255, 255, 255, 0.08)";
const appPrimary = "#c63031";

export function createAppTheme() {
  return createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: appPrimary,
        light: "#e85a5b",
        dark: "#b52b2c",
        contrastText: "#ffffff",
      },
      error: {
        main: "#d9534f",
      },
      background: {
        default: appSurface,
        paper: appDialogSurface,
      },
      text: {
        primary: appText,
        secondary: appTextMuted,
        disabled: "rgba(255, 255, 255, 0.38)",
      },
      divider: appDivider,
      action: {
        active: appText,
        hover: "rgba(255, 255, 255, 0.08)",
        selected: "rgba(255, 255, 255, 0.12)",
        disabled: "rgba(255, 255, 255, 0.38)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
      },
    },
    typography: {
      fontFamily:
        'var(--font-roboto, "Roboto"), "Helvetica", "Arial", sans-serif',
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      body1: {
        fontSize: 14,
        lineHeight: "20px",
        letterSpacing: "0.15px",
        fontWeight: 400,
      },
      body2: {
        fontSize: 14,
        lineHeight: "20px",
        letterSpacing: "0.15px",
        fontWeight: 400,
      },
      button: {
        ...labelTypography,
        textTransform: "uppercase",
      },
      subtitle1: {
        fontWeight: 500,
      },
      subtitle2: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
      },
      h4: {
        fontWeight: 500,
      },
      h3: {
        fontWeight: 500,
      },
      h2: {
        fontWeight: 400,
      },
      h1: {
        fontWeight: 400,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "20px",
            letterSpacing: "0.15px",
            backgroundColor: appSurface,
            color: appText,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            backgroundColor: appDialogSurface,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            letterSpacing: "0.4px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            letterSpacing: "0.4px",
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            backgroundColor: appSurface,
            backgroundImage: "none",
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderColor: appDivider,
            backgroundColor: "transparent",
          },
          head: {
            fontWeight: 500,
            backgroundColor: "transparent",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.12)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
          },
        },
      },
    },
  });
}
