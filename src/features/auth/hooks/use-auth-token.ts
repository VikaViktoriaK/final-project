"use client";

import { useSyncExternalStore } from "react";
import { getAccessToken, subscribeToAuthTokens } from "../lib/auth-storage";

function getServerTokenSnapshot(): undefined {
  return undefined;
}

function getClientTokenSnapshot(): string | null {
  return getAccessToken();
}

function useAuthToken() {
  return useSyncExternalStore(
    subscribeToAuthTokens,
    getClientTokenSnapshot,
    getServerTokenSnapshot,
  );
}

export default useAuthToken;
