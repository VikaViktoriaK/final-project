import type { AppearancePreference, ResolvedThemeMode } from "./types";

function getColorSchemeMedia(): MediaQueryList | null {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
}

export function getSystemThemeMode(): ResolvedThemeMode {
  const media = getColorSchemeMedia();
  if (!media) {
    return "dark";
  }
  return media.matches ? "dark" : "light";
}

export function subscribeSystemThemeMode(
  onChange: (mode: ResolvedThemeMode) => void,
): (() => void) | undefined {
  const media = getColorSchemeMedia();
  if (!media) {
    return undefined;
  }

  const handleChange = () => {
    onChange(media.matches ? "dark" : "light");
  };

  handleChange();
  media.addEventListener("change", handleChange);
  return () => media.removeEventListener("change", handleChange);
}

export function resolveThemeMode(
  appearance: AppearancePreference,
): ResolvedThemeMode {
  if (appearance === "system") {
    return getSystemThemeMode();
  }
  return appearance;
}
