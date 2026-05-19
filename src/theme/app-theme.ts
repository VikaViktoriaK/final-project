import { createTheme } from "@mui/material/styles";

/** Shared uppercase label (tabs, pill buttons, column headers). */
export const labelTypography = {
  fontWeight: 500,
  fontSize: 14,
  lineHeight: "17.5px",
  letterSpacing: "0.4px",
} as const;

export function createAppTheme() {
  return createTheme({
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
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
          head: {
            fontWeight: 500,
          },
        },
      },
    },
  });
}
