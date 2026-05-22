"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apollo/client";
import { PreferencesProvider } from "@/lib/preferences/PreferencesProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PreferencesProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </PreferencesProvider>
  );
}

export default Providers;
