"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { translate, type MessageKey } from "@/i18n/messages";
import { createAppTheme } from "@/theme/app-theme";

import {
  loadAppearancePreference,
  loadLocale,
  saveAppearancePreference,
  saveLocale,
} from "./storage";

import { getSystemThemeMode, subscribeSystemThemeMode } from "./resolve-theme";

import type { AppearancePreference, Locale, ResolvedThemeMode } from "./types";

type PreferencesContextValue = {
  appearance: AppearancePreference;
  setAppearance: (value: AppearancePreference) => void;

  resolvedTheme: ResolvedThemeMode;

  locale: Locale;
  setLocale: (value: Locale) => void;

  t: (key: MessageKey) => string;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function applyThemeToDocument(mode: ResolvedThemeMode, locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = mode;
  document.documentElement.lang = locale;
}

type PreferencesProviderProps = {
  children: ReactNode;
};

function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [appearance, setAppearanceState] = useState<AppearancePreference>(() =>
    loadAppearancePreference(),
  );

  const [locale, setLocaleState] = useState<Locale>(() => loadLocale());

  const [systemDark, setSystemDark] = useState<boolean>(
    () => getSystemThemeMode() === "dark",
  );

  useEffect(() => {
    if (appearance !== "system") {
      return;
    }

    return subscribeSystemThemeMode((mode) => {
      setSystemDark(mode === "dark");
    });
  }, [appearance]);

  const resolvedTheme = useMemo<ResolvedThemeMode>(() => {
    if (appearance === "system") {
      return systemDark ? "dark" : "light";
    }

    return appearance;
  }, [appearance, systemDark]);

  useEffect(() => {
    applyThemeToDocument(resolvedTheme, locale);
  }, [resolvedTheme, locale]);

  const setAppearance = useCallback((value: AppearancePreference) => {
    setAppearanceState(value);
    saveAppearancePreference(value);
  }, []);

  const setLocale = useCallback((value: Locale) => {
    setLocaleState(value);
    saveLocale(value);
  }, []);

  const theme = useMemo(() => createAppTheme(resolvedTheme), [resolvedTheme]);

  const t = useCallback((key: MessageKey) => translate(locale, key), [locale]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      appearance,
      setAppearance,

      resolvedTheme,

      locale,
      setLocale,

      t,
    }),
    [appearance, setAppearance, resolvedTheme, locale, setLocale, t],
  );

  return (
    <PreferencesContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PreferencesContext.Provider>
  );
}

function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
}

export { PreferencesProvider, usePreferences };
