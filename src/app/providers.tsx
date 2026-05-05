"use client";

import * as React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { createApolloClient } from "@/lib/apolloClient";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = React.useMemo(() => createApolloClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Providers;
