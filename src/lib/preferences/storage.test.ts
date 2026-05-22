import {
  APPEARANCE_STORAGE_KEY,
  LOCALE_STORAGE_KEY,
  loadAppearancePreference,
  loadLocale,
  saveAppearancePreference,
  saveLocale,
} from "./storage";

describe("preferences storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads defaults for missing or invalid values", () => {
    expect(loadAppearancePreference()).toBe("dark");
    expect(loadLocale()).toBe("en");

    localStorage.setItem(APPEARANCE_STORAGE_KEY, "invalid");
    localStorage.setItem(LOCALE_STORAGE_KEY, "xx");

    expect(loadAppearancePreference()).toBe("dark");
    expect(loadLocale()).toBe("en");
  });

  it("persists valid appearance and locale", () => {
    saveAppearancePreference("light");
    saveLocale("ru");

    expect(loadAppearancePreference()).toBe("light");
    expect(loadLocale()).toBe("ru");
  });

  it("returns defaults when window is unavailable", () => {
    const originalWindow = global.window;
    // @ts-expect-error simulate SSR
    delete global.window;

    expect(loadAppearancePreference()).toBe("dark");
    expect(loadLocale()).toBe("en");

    global.window = originalWindow;
  });

  it("no-ops saves when window is unavailable", () => {
    const originalWindow = global.window;
    // @ts-expect-error simulate SSR
    delete global.window;

    expect(() => saveAppearancePreference("dark")).not.toThrow();
    expect(() => saveLocale("de")).not.toThrow();

    global.window = originalWindow;
  });
});
