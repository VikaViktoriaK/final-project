import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
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

  const errorLink = onError((err: unknown) => {
    const maybeErr = err as {
      graphQLErrors?: unknown[];
      networkError?: unknown;
      operation?: { operationName?: string; variables?: unknown };
    };

    const graphQLErrors = maybeErr?.graphQLErrors;
    const networkError = maybeErr?.networkError;
    const operation = maybeErr?.operation;

    const normalizeGraphqlError = (e: unknown) => {
      const maybe = e as {
        message?: unknown;
        path?: unknown;
        extensions?: unknown;
      };
      return {
        message: typeof maybe?.message === "string" ? maybe.message : undefined,
        path: maybe?.path,
        extensions: maybe?.extensions,
      };
    };

    if (Array.isArray(graphQLErrors) && graphQLErrors.length > 0) {
      console.error("GraphQL errors", {
        operation: operation?.operationName,
        variables: operation?.variables,
        graphQLErrors: graphQLErrors.map(normalizeGraphqlError),
      });
    }
    if (networkError) {
      console.error("GraphQL network error", {
        operation: operation?.operationName,
        variables: operation?.variables,
        networkError,
      });
    }
  });
  const httpLink = new HttpLink({
    uri: resolvedUri,
    fetch: async (input, init) => {
      const res = await fetch(input, init);
      if (!res.ok) {
        try {
          const text = await res.clone().text();
          console.error("GraphQL HTTP error", res.status, text);
        } catch {
          console.error("GraphQL HTTP error", res.status);
        }
      }
      return res;
    },
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
