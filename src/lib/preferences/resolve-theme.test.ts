import { resolveThemeMode } from "./resolve-theme";

describe("resolveThemeMode", () => {
  it("returns dark and light for explicit preferences", () => {
    expect(resolveThemeMode("dark")).toBe("dark");
    expect(resolveThemeMode("light")).toBe("light");
  });
});
