import { useSyncExternalStore } from "react";

const ACCESS_TOKEN_KEY = "hrm_access_token";
const REFRESH_TOKEN_KEY = "hrm_refresh_token";

function hasBrowserStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function emitAuthStorageChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("auth-storage-changed"));
}

export const saveAuthTokens = (
  accessToken: string,
  refreshToken: string,
): void => {
  if (!hasBrowserStorage()) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  emitAuthStorageChanged();
};

export const getAccessToken = (): string | null => {
  if (!hasBrowserStorage()) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  if (!hasBrowserStorage()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const clearAuthTokens = (): void => {
  if (!hasBrowserStorage()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  emitAuthStorageChanged();
};

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    if (typeof atob === "undefined") return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const normalized =
      payload + "=".repeat((4 - (payload.length % 4 || 4)) % 4);
    const decoded = atob(normalized);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export const getCurrentUserId = (): string | null => {
  const token = getAccessToken();
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  const idValue =
    payload.id ?? payload.sub ?? payload.userId ?? payload.user_id;
  if (typeof idValue === "string") return idValue;
  if (typeof idValue === "number") return String(idValue);
  return null;
};

export const getCurrentUserRole = (): string | null => {
  const token = getAccessToken();
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  const roleValue = payload.role;
  if (typeof roleValue === "string") return roleValue;
  return null;
};

type AuthSnapshot = {
  userId: string | null;
  role: string | null;
};

const EMPTY_AUTH_SNAPSHOT: AuthSnapshot = {
  userId: null,
  role: null,
};

let lastClientSnapshot: AuthSnapshot = EMPTY_AUTH_SNAPSHOT;

function getClientAuthSnapshot(): AuthSnapshot {
  const nextUserId = getCurrentUserId();
  const nextRole = getCurrentUserRole();

  if (
    lastClientSnapshot.userId === nextUserId &&
    lastClientSnapshot.role === nextRole
  ) {
    return lastClientSnapshot;
  }

  lastClientSnapshot = {
    userId: nextUserId,
    role: nextRole,
  };
  return lastClientSnapshot;
}

function subscribeAuthSnapshot(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("auth-storage-changed", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("auth-storage-changed", onStoreChange);
  };
}

export function useAuthSnapshot(): AuthSnapshot {
  return useSyncExternalStore(
    subscribeAuthSnapshot,
    getClientAuthSnapshot,
    () => EMPTY_AUTH_SNAPSHOT,
  );
}
