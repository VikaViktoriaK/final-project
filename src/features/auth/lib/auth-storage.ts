const ACCESS_TOKEN_KEY = "hrm_access_token";
const REFRESH_TOKEN_KEY = "hrm_refresh_token";
const AUTH_TOKENS_CHANGED_EVENT = "auth-tokens-changed";

const notifyAuthTokensChanged = () => {
  window.dispatchEvent(new Event(AUTH_TOKENS_CHANGED_EVENT));
};

export const saveAuthTokens = (
  accessToken: string,
  refreshToken: string,
): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  notifyAuthTokensChanged();
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const clearAuthTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  notifyAuthTokensChanged();
};

export const subscribeToAuthTokens = (callback: () => void): (() => void) => {
  window.addEventListener(AUTH_TOKENS_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(AUTH_TOKENS_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};
