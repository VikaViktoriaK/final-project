import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname } from "next/navigation";
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

      <Box className="sidebar-nav-footer" sx={sidebarSx.footer}>
        <SidebarProfileLink
          profileHref={profileHref}
          profileActive={profileActive}
          displayName={displayName}
          initial={initial}
          avatarUrl={user?.avatarUrl}
          collapsed={collapsed}
        />

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
