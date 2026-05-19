"use client";

import { useMemo } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import client from "@/lib/apollo/client";
import { store } from "@/store";
import AuthSync from "@/store/components/auth-sync";
import { createAppTheme } from "@/theme/app-theme";

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => createAppTheme(), []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthSync />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default Providers;
