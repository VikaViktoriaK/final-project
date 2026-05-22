import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname, useRouter } from "next/navigation";

// --- NEW MENU IMPORTS ---
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import useLogout from "@/features/auth/hooks/use-logout";
// ------------------------

import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import { useUserQuery } from "@/features/users/api/getUser";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarProfileLink } from "./SidebarProfileLink";
import { useSidebarCollapse } from "./SidebarCollapseContext";
import {
  getDisplayName,
  getInitial,
  isProfileActive,
  toNavSections,
} from "./sidebarNav.utils";
import { sidebarSx } from "./sidebar.styles";
import "./sidebar-nav.css";

export function AppSidebar() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { collapsed, toggle } = useSidebarCollapse();
  const { userId, role } = useAuthSnapshot();
  const isAdmin = role === "Admin";
  const navSections = React.useMemo(() => toNavSections(isAdmin), [isAdmin]);
  const { user } = useUserQuery(userId ?? "");

  const displayName = user
    ? getDisplayName(user.firstName, user.lastName, user.email)
    : "User";
  const initial = getInitial(displayName, user?.email);
  const profileHref = userId ? `/users/${userId}/profile` : "/users";
  const profileActive = isProfileActive(pathname, userId);

  const { logoutUser } = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logoutUser();
  };

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
        {navSections.map((section, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            {sectionIndex > 0 ? (
              <Divider className="sidebar-nav-divider" aria-hidden />
            ) : null}
            {section.items.map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                pathname={pathname}
                userId={userId}
                collapsed={collapsed}
              />
            ))}
          </React.Fragment>
        ))}
        <Box className="sidebar-nav-item--mobile-only">
          <Box onClickCapture={handleMenuOpen} sx={{ cursor: "pointer" }}>
            <SidebarProfileLink
              profileHref={profileHref}
              profileActive={profileActive}
              displayName={displayName}
              initial={initial}
              avatarUrl={user?.avatarUrl}
              collapsed={false}
            />
          </Box>
        </Box>
      </Box>

      <Box className="sidebar-nav-footer" sx={sidebarSx.footer}>
        <Box
          onClickCapture={handleMenuOpen}
          sx={{ cursor: "pointer", width: "100%" }}
          data-testid="user-menu-trigger"
        >
          <SidebarProfileLink
            profileHref={profileHref}
            profileActive={profileActive}
            displayName={displayName}
            initial={initial}
            avatarUrl={user?.avatarUrl}
            collapsed={collapsed}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          transformOrigin={{ horizontal: "center", vertical: "bottom" }}
          sx={{
            "& .MuiPaper-root": {
              bgcolor: "var(--app-surface)",
              color: "var(--app-text)",
              minWidth: 180,
              mb: 1,
              borderRadius: 2,
              border: "1px solid var(--app-control-border)",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
            },
            "& .MuiMenuItem-root": {
              py: 1.5,
              px: 2,
              "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
            },
            "& .MuiListItemIcon-root": {
              color: "var(--app-text)",
              minWidth: 36,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              router.push(profileHref);
            }}
          >
            <ListItemIcon>
              <AccountCircleOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>

          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>

          <Divider sx={{ borderColor: "var(--app-control-border)", my: 0.5 }} />

          <MenuItem onClick={handleLogout} data-testid="logout-menu-item">
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>

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
