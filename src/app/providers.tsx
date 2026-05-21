"use client";

import { useMemo } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import client from "@/lib/apollo/client";
import { createAppTheme } from "@/theme/app-theme";

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => createAppTheme(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  );
}

export default Providers;
