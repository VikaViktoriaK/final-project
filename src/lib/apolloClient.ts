import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getAccessToken } from "@/features/auth/lib/auth-storage";

function getGraphqlUri() {
  return (
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    process.env.VITE_GRAPHQL_URL ??
    "/api/graphql"
  );
}

export function createApolloClient() {
  const uri = getGraphqlUri();
  const resolvedUri =
    uri.startsWith("http://") || uri.startsWith("https://")
      ? uri
      : typeof window !== "undefined"
        ? new URL(uri, window.location.origin).toString()
        : uri;
  const authLink = new ApolloLink((operation, forward) => {
    if (typeof window !== "undefined") {
      const token = getAccessToken();
      if (token) {
        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        }));
      }
    }
    return forward(operation);
  });
  const httpLink = new HttpLink({
    uri: resolvedUri,
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
