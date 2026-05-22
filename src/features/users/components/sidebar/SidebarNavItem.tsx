import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useTranslation } from "@/i18n/use-translation";
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
  const { t } = useTranslation();
  const label = t(item.labelKey);
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
        {label}
      </Typography>
    </>
  );

  const link = navigable ? (
    <Box
      component={Link}
      href={href}
      className={className}
      aria-current={active ? "page" : undefined}
      data-testid={`nav-${item.id}`}
    >
      {itemContent}
    </Box>
  ) : (
    <Box component="span" className={className} aria-disabled="true">
      {itemContent}
    </Box>
  );

  const wrapped = collapsed ? (
    <Tooltip title={label} placement="right">
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
