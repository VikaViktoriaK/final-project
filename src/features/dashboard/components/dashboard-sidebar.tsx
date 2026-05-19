"use client";

import { usePathname } from "next/navigation";
import { getAuthUser } from "@/features/auth/lib/auth-storage";
import useLogout from "@/features/auth/hooks/use-logout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebarCollapsed } from "@/store/slices/ui-slice";
import { dashboardStyles } from "../styles/dashboard.styles";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Avatar, Box, Button, Typography } from "@mui/material";
import NextLink from "next/link";
import AppArrow from "@/components/app-arrow";
import { DASHBOARD_NAV_ITEMS, isNavItemActive } from "../constants/nav-items";

function DashboardSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { logoutUser } = useLogout();
  const user = useAppSelector((state) => state.auth.user) ?? getAuthUser();
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

  const displayName = user?.profile?.full_name ?? user?.email ?? "User";
  const initial = displayName.charAt(0).toUpperCase();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebarCollapsed());
  };

  return (
    <Box
      component="nav"
      aria-label="Main navigation"
      sx={[
        dashboardStyles.sidebar,
        sidebarCollapsed && dashboardStyles.sidebarCollapsed,
      ]}
    >
      <Box sx={dashboardStyles.navList}>
        {DASHBOARD_NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = isNavItemActive(pathname, href);

          return (
            <Box
              key={label}
              component={NextLink}
              href={href}
              sx={[
                dashboardStyles.navItem,
                isActive && dashboardStyles.navItemActive,
              ]}
            >
              <Icon fontSize="small" />
              {!sidebarCollapsed && label}
            </Box>
          );
        })}
      </Box>

      <Box sx={dashboardStyles.userSection}>
        <Avatar sx={dashboardStyles.userAvatar}>{initial}</Avatar>
        {!sidebarCollapsed && (
          <Typography variant="body2" sx={dashboardStyles.userName}>
            {displayName}
          </Typography>
        )}
        <Button
          type="button"
          size="small"
          onClick={handleToggleSidebar}
          sx={dashboardStyles.iconButton}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <AppArrow direction={sidebarCollapsed ? "right" : "left"} size={14} />
        </Button>
        <Button
          type="button"
          size="small"
          onClick={logoutUser}
          sx={dashboardStyles.iconButton}
          aria-label="Sign out"
        >
          <LogoutOutlinedIcon fontSize="small" />
        </Button>
      </Box>
    </Box>
  );
}

export default DashboardSidebar;
