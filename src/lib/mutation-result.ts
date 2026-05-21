import { CombinedGraphQLErrors } from "@apollo/client/errors";

type MutationResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; message: string };

function getGraphQlErrorMessage(error: CombinedGraphQLErrors): string {
  const first = error.errors[0];
  if (!first) {
    return "Request failed";
  }

  const responseMessage =
    first.extensions &&
    typeof first.extensions === "object" &&
    "response" in first.extensions &&
    first.extensions.response &&
    typeof first.extensions.response === "object" &&
    "message" in first.extensions.response
      ? (first.extensions.response as { message?: unknown }).message
      : undefined;

  if (Array.isArray(responseMessage)) {
    return responseMessage.join(", ");
  }
  if (typeof responseMessage === "string" && responseMessage.trim()) {
    return responseMessage;
  }

  if (first.message && first.message !== "Bad Request Exception") {
    return first.message;
  }

  return "Invalid request. Check the form fields and try again.";
}

function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (CombinedGraphQLErrors.is(error)) {
    return getGraphQlErrorMessage(error);
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

async function runMutation<T>(
  action: () => Promise<T>,
  fallbackMessage = "Something went wrong",
): Promise<MutationResult<T>> {
  try {
    const data = await action();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: getErrorMessage(error, fallbackMessage) };
  }
}

export type { MutationResult };
export { runMutation };
