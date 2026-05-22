import type { AppearancePreference, Locale } from "./types";

export const APPEARANCE_STORAGE_KEY = "hrm_appearance";
export const LOCALE_STORAGE_KEY = "hrm_locale";

const APPEARANCE_VALUES: AppearancePreference[] = ["system", "dark", "light"];
const LOCALE_VALUES: Locale[] = ["en", "ru", "de"];

function readStorage(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(key);
}

export function loadAppearancePreference(): AppearancePreference {
  const stored = readStorage(APPEARANCE_STORAGE_KEY);
  if (stored && APPEARANCE_VALUES.includes(stored as AppearancePreference)) {
    return stored as AppearancePreference;
  }
  return "dark";
}

export function saveAppearancePreference(value: AppearancePreference): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(APPEARANCE_STORAGE_KEY, value);
}

export function loadLocale(): Locale {
  const stored = readStorage(LOCALE_STORAGE_KEY);
  if (stored && LOCALE_VALUES.includes(stored as Locale)) {
    return stored as Locale;
  }
  return "en";
}

export function saveLocale(value: Locale): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LOCALE_STORAGE_KEY, value);
}
