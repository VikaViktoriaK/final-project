import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { SidebarNavItem as SidebarNavItemConfig } from "./sidebar.constants";
import { navItemClassName, resolveHref } from "./sidebarNav.utils";

export type SidebarNavItemProps = {
  item: SidebarNavItemConfig;
  pathname: string;
  userId: string | null;
  collapsed: boolean;
};

export function SidebarNavItem({
  item,
  pathname,
  userId,
  collapsed,
}: SidebarNavItemProps) {
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
      <Box sx={{ display: { xs: "none", md: "contents" } }}>{wrapped}</Box>
    );
  }

  return <React.Fragment>{wrapped}</React.Fragment>;
}
