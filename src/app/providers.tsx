"use client";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apollo/client";

function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Providers;
