import { createTheme, type PaletteMode } from "@mui/material/styles";

/** Shared uppercase label (tabs, pill buttons, column headers). */
export const labelTypography = {
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "17.5px",
  letterSpacing: "0.4px",
} as const;

const darkTokens = {
  appText: "rgba(255, 255, 255, 0.92)",
  appTextMuted: "rgba(255, 255, 255, 0.68)",
  appSurface: "#353535",
  appDialogSurface: "#2a2a2a",
  appDivider: "rgba(255, 255, 255, 0.08)",
  outlineBorder: "rgba(255, 255, 255, 0.12)",
  outlineBorderHover: "rgba(255, 255, 255, 0.2)",
};

const lightTokens = {
  appText: "rgba(0, 0, 0, 0.87)",
  appTextMuted: "rgba(0, 0, 0, 0.6)",
  appSurface: "#ffffff",
  appDialogSurface: "#ffffff",
  appDivider: "rgba(0, 0, 0, 0.12)",
  outlineBorder: "rgba(0, 0, 0, 0.23)",
  outlineBorderHover: "rgba(0, 0, 0, 0.4)",
};

const appPrimary = "#c63031";

export function createAppTheme(mode: PaletteMode = "dark") {
  const tokens = mode === "light" ? lightTokens : darkTokens;

  return createTheme({
    palette: {
      mode,
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
        default: tokens.appSurface,
        paper: tokens.appDialogSurface,
      },
      text: {
        primary: tokens.appText,
        secondary: tokens.appTextMuted,
        disabled:
          mode === "light"
            ? "rgba(0, 0, 0, 0.38)"
            : "rgba(255, 255, 255, 0.38)",
      },
      divider: tokens.appDivider,
      action: {
        active: tokens.appText,
        hover:
          mode === "light"
            ? "rgba(0, 0, 0, 0.04)"
            : "rgba(255, 255, 255, 0.08)",
        selected:
          mode === "light"
            ? "rgba(0, 0, 0, 0.08)"
            : "rgba(255, 255, 255, 0.12)",
        disabled:
          mode === "light"
            ? "rgba(0, 0, 0, 0.38)"
            : "rgba(255, 255, 255, 0.38)",
        disabledBackground:
          mode === "light"
            ? "rgba(0, 0, 0, 0.12)"
            : "rgba(255, 255, 255, 0.12)",
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
            backgroundColor: tokens.appSurface,
            color: tokens.appText,
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
            backgroundColor: tokens.appDialogSurface,
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
            backgroundColor: tokens.appSurface,
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
            borderColor: tokens.appDivider,
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
              borderColor: tokens.outlineBorder,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: tokens.outlineBorderHover,
            },
          },
        },
      },
    },
  });
}
