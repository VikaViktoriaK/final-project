import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

function getGraphqlUri() {
  return process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "/api/graphql";
}

export function createApolloClient() {
  const uri = getGraphqlUri();
  const resolvedUri =
    uri.startsWith("http://") || uri.startsWith("https://")
      ? uri
      : typeof window !== "undefined"
        ? new URL(uri, window.location.origin).toString()
        : uri;

  return new ApolloClient({
    link: new HttpLink({
      uri: resolvedUri,
    }),
    cache: new InMemoryCache(),
  });
}
