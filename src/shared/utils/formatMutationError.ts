const MSG_AVATAR_UPLOAD_UNAVAILABLE =
  "We couldn’t save your photo. Please try again in a moment or use a smaller image. If this keeps happening, contact support.";

const MSG_AVATAR_CLOUDINARY =
  "Photo upload isn’t configured correctly on the server (missing or invalid cloud storage keys). Ask your administrator to set real API keys in the API environment, not placeholders like API_KEY.";

function firstGraphQLErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const e = error as {
    graphQLErrors?: ReadonlyArray<{ message?: string }>;
    networkError?: {
      result?: { errors?: ReadonlyArray<{ message?: string }> };
    };
  };
  const gql = e.graphQLErrors?.[0]?.message;
  if (typeof gql === "string" && gql.trim()) return gql.trim();
  const net = e.networkError?.result?.errors?.[0]?.message;
  if (typeof net === "string" && net.trim()) return net.trim();
  return null;
}

export function extractGraphqlErrorMessage(err: unknown): string {
  const anyErr = err as {
    message?: string;
    graphQLErrors?: Array<{
      message?: string;
      extensions?: {
        response?: {
          message?: unknown;
        };
      };
    }>;
  };

  const gql = anyErr?.graphQLErrors?.[0];
  const extMsg = gql?.extensions?.response?.message;

  if (Array.isArray(extMsg)) return extMsg.filter(Boolean).join(", ");
  if (typeof extMsg === "string") return extMsg;

  if (typeof gql?.message === "string" && gql.message) return gql.message;
  if (typeof anyErr?.message === "string" && anyErr.message)
    return anyErr.message;

  return "Bad Request";
}

export function formatMutationError(error: unknown): string {
  const blob =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : error && typeof error === "object"
          ? (() => {
              try {
                return JSON.stringify(error);
              } catch {
                return String(error);
              }
            })()
          : String(error);

  if (
    blob.includes("ENAMETOOLONG") ||
    blob.includes('"errno":-36') ||
    blob.includes('"errno": -36') ||
    (blob.includes('"code":"ENAMETOOLONG"') && blob.includes('"path"'))
  ) {
    return MSG_AVATAR_UPLOAD_UNAVAILABLE;
  }

  if (
    blob.includes("Must supply api_key") ||
    blob.includes("cloudinary") ||
    blob.includes("Unknown API key") ||
    (blob.includes("http_code") &&
      blob.includes("401") &&
      blob.includes("API_KEY"))
  ) {
    return MSG_AVATAR_CLOUDINARY;
  }

  const gqlMsg = firstGraphQLErrorMessage(error);
  if (gqlMsg) {
    return gqlMsg;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }
  if (blob.trim() && blob.length < 500) {
    return blob;
  }
  return "Failed to update profile.";
}

/** @deprecated Use formatMutationError */
export function formatProfileSubmitError(error: unknown): string {
  return formatMutationError(error);
}
