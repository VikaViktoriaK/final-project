import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { Observable } from "@apollo/client/utilities";
import {
  clearAuthTokens,
  getAccessToken,
} from "@/features/auth/lib/auth-storage";
import isAuthFailure from "@/features/auth/lib/is-auth-failure";
import tryRefreshSession from "@/features/auth/lib/try-refresh-session";

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const existingAuthorization =
      headers.Authorization ?? headers.authorization;
    const token = getAccessToken();
    return {
      headers: {
        ...headers,
        ...(existingAuthorization || !token
          ? {}
          : { Authorization: `Bearer ${token}` }),
      },
    };
  });
  return forward(operation);
});

const authErrorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!isAuthFailure(error)) {
    return;
  }

  if (operation.getContext().authRetry) {
    clearAuthTokens();
    return;
  }

  return new Observable((observer) => {
    let retrySubscription: { unsubscribe: () => void } | undefined;

    void tryRefreshSession().then((isRefreshed) => {
      if (!isRefreshed) {
        clearAuthTokens();
        observer.error(error);
        return;
      }

      const context = operation.getContext();
      operation.setContext({ ...context, authRetry: true });
      retrySubscription = forward(operation).subscribe(observer);
    });

    return () => {
      retrySubscription?.unsubscribe();
    };
  });
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: authErrorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
