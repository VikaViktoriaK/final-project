"use client";

import { useSyncExternalStore } from "react";
import { getAccessToken, subscribeToAuthTokens } from "../lib/auth-storage";

function getServerSnapshot() {
  return null;
}

function useAuthToken() {
  return useSyncExternalStore(
    subscribeToAuthTokens,
    getAccessToken,
    getServerSnapshot,
  );
}

export default useAuthToken;
