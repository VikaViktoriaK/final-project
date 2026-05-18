"use client";

import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "react-redux";
import client from "@/lib/apollo/client";
import { store } from "@/store";
import AuthSync from "@/store/components/auth-sync";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthSync />
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  );
}

export default Providers;
