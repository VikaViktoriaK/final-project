import {
  getRefreshToken,
  saveAuthTokens,
} from "@/features/auth/lib/auth-storage";
import type { AuthUser } from "@/features/auth/types/auth.types";

type GraphqlPayload = {
  data?: Record<string, unknown> | null;
  errors?: readonly { message: string }[];
};

type TokenPair = {
  access_token: string;
  refresh_token: string;
  user?: AuthUser;
};

const UPDATE_TOKEN_MUTATION = `mutation UpdateToken {
  updateToken {
    access_token
    refresh_token
  }
}`;

let refreshInFlight: Promise<boolean> | null = null;

async function postUpdateToken(
  uri: string,
  refreshToken: string,
): Promise<GraphqlPayload> {
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
    body: JSON.stringify({ query: UPDATE_TOKEN_MUTATION }),
  });
  return (await response.json()) as GraphqlPayload;
}

function extractUpdateTokenResult(data: unknown): TokenPair | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const updateToken = (data as { updateToken?: unknown }).updateToken;
  if (
    !updateToken ||
    typeof updateToken !== "object" ||
    !("access_token" in updateToken) ||
    !("refresh_token" in updateToken)
  ) {
    return null;
  }

  const tokens = updateToken as {
    access_token: unknown;
    refresh_token: unknown;
  };

  if (
    typeof tokens.access_token !== "string" ||
    typeof tokens.refresh_token !== "string"
  ) {
    return null;
  }

  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  };
}

/**
 * Refreshes the session via the API's `updateToken` mutation.
 * Sends the stored refresh token as a Bearer token (no variables).
 */
async function tryRefreshSessionInternal(): Promise<boolean> {
  const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const refreshToken = getRefreshToken();
  if (!uri || !refreshToken) {
    return false;
  }

  try {
    const json = await postUpdateToken(uri, refreshToken);
    if (json.errors?.length) {
      return false;
    }

    const auth = extractUpdateTokenResult(json.data ?? null);
    if (!auth) {
      return false;
    }

    saveAuthTokens(auth.access_token, auth.refresh_token);
    return true;
  } catch {
    return false;
  }
}

function tryRefreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = tryRefreshSessionInternal().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

export default tryRefreshSession;
