import {
  ADMIN_SIDEBAR_SECTIONS,
  SIDEBAR_NAV_ITEMS,
  type SidebarNavSection,
} from "./sidebar.constants";

export function resolveHref(
  href: string | ((userId: string | null) => string),
  userId: string | null,
): string {
  return typeof href === "function" ? href(userId) : href;
}

export function getDisplayName(
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
): string {
  const full = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  if (full) return full;
  return email ?? "User";
}

export function getInitial(name: string, email?: string): string {
  const source = name.trim() || email?.trim() || "U";
  return source.charAt(0).toUpperCase();
}

export function isProfileActive(
  pathname: string,
  userId: string | null,
): boolean {
  if (!userId) return false;
  return pathname === `/users/${userId}/profile`;
}

export function navItemClassName(active: boolean, disabled: boolean): string {
  return [
    "sidebar-nav-item",
    active && "sidebar-nav-item--active",
    disabled && "sidebar-nav-item--disabled",
  ]
    .filter(Boolean)
    .join(" ");
}

export function toNavSections(isAdmin: boolean): SidebarNavSection[] {
  if (isAdmin) return ADMIN_SIDEBAR_SECTIONS;
  return [{ items: SIDEBAR_NAV_ITEMS }];
}
