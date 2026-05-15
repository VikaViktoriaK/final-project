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

function extractAuthResult(data: unknown): TokenPair | null {
  if (!data || typeof data !== "object") {
    return null;
  }
  for (const value of Object.values(data as Record<string, unknown>)) {
    if (
      value &&
      typeof value === "object" &&
      "access_token" in value &&
      "refresh_token" in value
    ) {
      const v = value as {
        access_token: unknown;
        refresh_token: unknown;
        user?: AuthUser;
      };
      if (
        typeof v.access_token === "string" &&
        typeof v.refresh_token === "string"
      ) {
        return {
          access_token: v.access_token,
          refresh_token: v.refresh_token,
          ...(v.user ? { user: v.user } : {}),
        };
      }
    }
  }
  return null;
}

const REFRESH_ATTEMPTS: { query: string }[] = [
  {
    query: `query Refresh($refreshToken: String!) {
      refresh(refreshToken: $refreshToken) {
        access_token
        refresh_token
      }
    }`,
  },
  {
    query: `mutation Refresh($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
        access_token
        refresh_token
      }
    }`,
  },
  {
    query: `mutation RefreshAuth($refreshToken: String!) {
      refreshAuth(refreshToken: $refreshToken) {
        access_token
        refresh_token
      }
    }`,
  },
];

let refreshInFlight: Promise<boolean> | null = null;

async function postRefresh(
  uri: string,
  body: Record<string, unknown>,
): Promise<GraphqlPayload> {
  const response = await fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await response.json()) as GraphqlPayload;
  return json;
}

/**
 * Exchanges refresh_token for new tokens via GraphQL (same endpoint as Apollo).
 * Tries a few common operation shapes; extend REFRESH_ATTEMPTS if your API differs.
 */
async function tryRefreshSessionInternal(): Promise<boolean> {
  const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const refreshToken = getRefreshToken();
  if (!uri || !refreshToken) {
    return false;
  }

  for (const { query } of REFRESH_ATTEMPTS) {
    const json = await postRefresh(uri, {
      query,
      variables: { refreshToken },
    });
    if (json.errors?.length) {
      continue;
    }
    const auth = extractAuthResult(json.data ?? null);
    if (auth) {
      if (auth.user) {
        saveAuthTokens(auth.access_token, auth.refresh_token, auth.user);
      } else {
        saveAuthTokens(auth.access_token, auth.refresh_token);
      }
      return true;
    }
  }

  return false;
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
