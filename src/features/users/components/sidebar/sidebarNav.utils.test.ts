import {
  getDisplayName,
  getInitial,
  isProfileActive,
  navItemClassName,
  resolveHref,
  toNavSections,
} from "./sidebarNav.utils";

describe("sidebarNav utils", () => {
  it("resolves static and dynamic hrefs", () => {
    expect(resolveHref("/users", "1")).toBe("/users");
    expect(resolveHref((userId) => `/users/${userId}/profile`, "1")).toBe(
      "/users/1/profile",
    );
  });

  it("formats display name and initials", () => {
    expect(getDisplayName("Ada", "Lovelace", "ada@example.com")).toBe(
      "Ada Lovelace",
    );
    expect(getDisplayName(null, null, "ada@example.com")).toBe(
      "ada@example.com",
    );
    expect(getInitial("Ada Lovelace", "ada@example.com")).toBe("A");
  });

  it("detects active profile route and nav classes", () => {
    expect(isProfileActive("/users/1/profile", "1")).toBe(true);
    expect(isProfileActive("/users/2/profile", "1")).toBe(false);
    expect(navItemClassName(true, false)).toBe(
      "sidebar-nav-item sidebar-nav-item--active",
    );
    expect(navItemClassName(false, true)).toBe(
      "sidebar-nav-item sidebar-nav-item--disabled",
    );
  });

  it("returns admin or employee nav sections", () => {
    expect(toNavSections(true).length).toBeGreaterThan(1);
    expect(toNavSections(false)).toEqual([{ items: expect.any(Array) }]);
  });
});
