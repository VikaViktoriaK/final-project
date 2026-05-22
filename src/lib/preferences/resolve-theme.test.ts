import {
  getSystemThemeMode,
  resolveThemeMode,
  subscribeSystemThemeMode,
} from "./resolve-theme";

describe("resolve-theme", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns dark when matchMedia is unavailable", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    expect(getSystemThemeMode()).toBe("dark");
    expect(subscribeSystemThemeMode(jest.fn())).toBeUndefined();
  });

  it("returns light when system prefers light", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    });

    expect(getSystemThemeMode()).toBe("light");
  });

  it("returns dark when system prefers dark", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockReturnValue({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    });

    expect(getSystemThemeMode()).toBe("dark");
  });

  it("subscribes to system theme changes", () => {
    const listeners: Record<string, () => void> = {};
    const media = {
      matches: false,
      addEventListener: jest.fn((event: string, handler: () => void) => {
        listeners[event] = handler;
      }),
      removeEventListener: jest.fn(),
    };

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockReturnValue(media),
    });

    const onChange = jest.fn();
    const unsubscribe = subscribeSystemThemeMode(onChange);

    expect(onChange).toHaveBeenCalledWith("light");
    media.matches = true;
    listeners.change();
    expect(onChange).toHaveBeenCalledWith("dark");
    unsubscribe?.();
    expect(media.removeEventListener).toHaveBeenCalled();
  });

  it("resolves explicit appearance preferences", () => {
    expect(resolveThemeMode("dark")).toBe("dark");
    expect(resolveThemeMode("light")).toBe("light");
  });

  it("resolves system appearance via matchMedia", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: jest.fn().mockReturnValue({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    });

    expect(resolveThemeMode("system")).toBe("dark");
  });
});
