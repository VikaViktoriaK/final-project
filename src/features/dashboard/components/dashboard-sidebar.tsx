"use client";

import { usePathname } from "next/navigation";
import { getAuthUser } from "@/features/auth/lib/auth-storage";
import useLogout from "@/features/auth/hooks/use-logout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebarCollapsed } from "@/store/slices/ui-slice";
import { dashboardStyles } from "../styles/dashboard.styles";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Avatar, Box, Button, Typography } from "@mui/material";
import NextLink from "next/link";

const navItems = [
  { label: "Employees", href: "/users", icon: PeopleOutlineIcon },
  { label: "Skills", href: "/users", icon: ShowChartOutlinedIcon },
  { label: "Languages", href: "/users", icon: TranslateOutlinedIcon },
  { label: "CVs", href: "/cvs", icon: DescriptionOutlinedIcon },
] as const;

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
      sx={[
        dashboardStyles.sidebar,
        sidebarCollapsed && dashboardStyles.sidebarCollapsed,
      ]}
    >
      <Box sx={dashboardStyles.navList}>
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/cvs"
              ? pathname.startsWith("/cvs")
              : pathname.startsWith(href);

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
          <ChevronLeftIcon
            fontSize="small"
            sx={{
              transform: sidebarCollapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
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
