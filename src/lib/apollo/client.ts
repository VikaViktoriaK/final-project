import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getAccessToken } from "@/features/auth/lib/auth-storage";

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

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
