import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";

function graphQlLooksUnauthorized(
  errors: readonly { message: string; extensions?: unknown }[],
) {
  return errors.some((e) => {
    const code =
      e.extensions &&
      typeof e.extensions === "object" &&
      "code" in e.extensions &&
      typeof (e.extensions as { code?: unknown }).code === "string"
        ? (e.extensions as { code: string }).code
        : undefined;
    return (
      code === "UNAUTHENTICATED" ||
      /unauthorized/i.test(e.message) ||
      e.message === "Unauthorized"
    );
  });
}

function isAuthFailure(error: unknown): boolean {
  if (CombinedGraphQLErrors.is(error)) {
    return graphQlLooksUnauthorized(error.errors);
  }
  if (ServerError.is(error)) {
    return error.statusCode === 401;
  }
  return false;
}

export default isAuthFailure;
