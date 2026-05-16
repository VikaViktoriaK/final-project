"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useUserQuery } from "@/features/users/api/getUser";
import { SIDEBAR_NAV_ITEMS } from "./sidebar.constants";
import { sidebarSx } from "./sidebar.styles";
import { useSidebarCollapse } from "./SidebarCollapseContext";
import "./sidebar-nav.css";

function resolveHref(
  href: string | ((userId: string | null) => string),
  userId: string | null,
): string {
  return typeof href === "function" ? href(userId) : href;
}

function getDisplayName(
  firstName?: string | null,
  lastName?: string | null,
  email?: string,
): string {
  const full = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  if (full) return full;
  return email ?? "User";
}

function getInitial(name: string, email?: string): string {
  const source = name.trim() || email?.trim() || "U";
  return source.charAt(0).toUpperCase();
}

function isProfileActive(pathname: string, userId: string | null): boolean {
  if (!userId) return false;
  return pathname === `/users/${userId}/profile`;
}

function navItemClassName(active: boolean, disabled: boolean): string {
  return [
    "sidebar-nav-item",
    active && "sidebar-nav-item--active",
    disabled && "sidebar-nav-item--disabled",
  ]
    .filter(Boolean)
    .join(" ");
}

export function AppSidebar() {
  const pathname = usePathname() ?? "";
  const { collapsed, toggle } = useSidebarCollapse();
  const { userId } = useAuthSnapshot();
  const { user } = useUserQuery(userId ?? "");

  const displayName = user
    ? getDisplayName(user.firstName, user.lastName, user.email)
    : "User";
  const initial = getInitial(displayName, user?.email);
  const profileHref = userId ? `/users/${userId}/profile` : "/users";
  const profileActive = isProfileActive(pathname, userId);

  const renderNavItem = (item: (typeof SIDEBAR_NAV_ITEMS)[number]) => {
    const navigable = item.navigable ?? false;
    const href = resolveHref(item.href, userId);
    const active = item.isActive(pathname, userId);
    const Icon = item.icon;
    const hideOnMobile = item.showInMobileBar === false;
    const className = navItemClassName(active, !navigable);

    const itemContent = (
      <>
        <Icon aria-hidden />
        <Typography component="span" className="sidebar-nav-item__label">
          {item.label}
        </Typography>
      </>
    );

    const link = navigable ? (
      <Box
        component={Link}
        href={href}
        className={className}
        aria-current={active ? "page" : undefined}
      >
        {itemContent}
      </Box>
    ) : (
      <Box component="span" className={className} aria-disabled="true">
        {itemContent}
      </Box>
    );

    const wrapped = collapsed ? (
      <Tooltip title={item.label} placement="right">
        {link}
      </Tooltip>
    ) : (
      link
    );

    if (hideOnMobile) {
      return (
        <Box key={item.id} sx={{ display: { xs: "none", md: "contents" } }}>
          {wrapped}
        </Box>
      );
    }

    return <React.Fragment key={item.id}>{wrapped}</React.Fragment>;
  };

  const profileLink = (
    <Box
      component={Link}
      href={profileHref}
      className={[
        navItemClassName(profileActive, false),
        "sidebar-nav-item--profile",
      ].join(" ")}
      aria-label={displayName}
    >
      <Avatar sx={sidebarSx.userAvatar}>{initial}</Avatar>
      <Typography component="span" className="sidebar-nav-item__label">
        {displayName}
      </Typography>
    </Box>
  );

  return (
    <Box
      component="nav"
      aria-label="Main navigation"
      className={["sidebar-root", collapsed ? "sidebar-nav--collapsed" : ""]
        .filter(Boolean)
        .join(" ")}
      sx={sidebarSx.root(collapsed)}
    >
      <Box className="sidebar-nav-list" sx={sidebarSx.navList}>
        {SIDEBAR_NAV_ITEMS.map(renderNavItem)}
        <Box className="sidebar-nav-item--mobile-only">{profileLink}</Box>
      </Box>

      <Box className="sidebar-nav-footer" sx={sidebarSx.footer(collapsed)}>
        {collapsed ? (
          <Tooltip title={displayName} placement="right">
            {profileLink}
          </Tooltip>
        ) : (
          profileLink
        )}

        <Tooltip
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          placement="right"
        >
          <IconButton
            type="button"
            onClick={toggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            sx={sidebarSx.collapseBtn(collapsed)}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
