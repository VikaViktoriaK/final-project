"use client";

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getAuthUser } from "@/features/auth/lib/auth-storage";
import useLogout from "@/features/auth/hooks/use-logout";
import { useAppSelector } from "@/store/hooks";
import { DASHBOARD_NAV_ITEMS, isNavItemActive } from "../constants/nav-items";
import { dashboardStyles } from "../styles/dashboard.styles";

function DashboardMobileNav() {
  const pathname = usePathname();
  const { logoutUser } = useLogout();
  const user = useAppSelector((state) => state.auth.user) ?? getAuthUser();
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
    null,
  );

  const displayName = user?.profile?.full_name ?? user?.email ?? "User";
  const initial = displayName.charAt(0).toUpperCase();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logoutUser();
  };

  return (
    <Box
      component="nav"
      sx={dashboardStyles.mobileNav}
      aria-label="Main navigation"
    >
      <Box sx={dashboardStyles.mobileNavInner}>
        {DASHBOARD_NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = isNavItemActive(pathname, href);

          return (
            <Box
              key={label}
              component={NextLink}
              href={href}
              aria-label={label}
              sx={[
                dashboardStyles.mobileNavItem,
                isActive && dashboardStyles.mobileNavItemActive,
              ]}
            >
              <Icon fontSize="small" aria-hidden />
              <Typography
                component="span"
                sx={dashboardStyles.mobileNavItemLabel}
              >
                {label}
              </Typography>
            </Box>
          );
        })}

        <Box sx={dashboardStyles.mobileNavUser}>
          <IconButton
            type="button"
            onClick={handleOpenUserMenu}
            aria-label="Account menu"
            sx={dashboardStyles.mobileNavUserButton}
          >
            <Avatar sx={dashboardStyles.userAvatar}>{initial}</Avatar>
          </IconButton>
          <Typography component="span" sx={dashboardStyles.mobileNavUserName}>
            {displayName}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MenuItem onClick={handleLogout}>
          <LogoutOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default DashboardMobileNav;
