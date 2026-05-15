import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
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

const authRetryLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    const sub = forward(operation).subscribe({
      next: (value) => observer.next(value),
      error: (error: unknown) => {
        if (operation.getContext().authRetry || !isAuthFailure(error)) {
          observer.error(error);
          return;
        }
        void tryRefreshSession().then((ok) => {
          if (!ok) {
            clearAuthTokens();
            observer.error(error);
            return;
          }
          const context = operation.getContext();
          operation.setContext({ ...context, authRetry: true });
          forward(operation).subscribe(observer);
        });
      },
      complete: () => observer.complete(),
    });
    return () => sub.unsubscribe();
  });
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: authRetryLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
