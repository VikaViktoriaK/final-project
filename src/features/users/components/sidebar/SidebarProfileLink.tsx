import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { navItemClassName } from "./sidebarNav.utils";
import { sidebarSx } from "./sidebar.styles";

export type SidebarProfileLinkProps = {
  profileHref: string;
  profileActive: boolean;
  displayName: string;
  initial: string;
  avatarUrl?: string | null;
  collapsed: boolean;
  className?: string;
};

export function SidebarProfileLink({
  profileHref,
  profileActive,
  displayName,
  initial,
  avatarUrl,
  collapsed,
  className = "",
}: SidebarProfileLinkProps) {
  const profileLink = (
    <Box
      component={Link}
      href={profileHref}
      className={[
        navItemClassName(profileActive, false),
        "sidebar-nav-item--profile",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={displayName}
    >
      <Avatar
        src={avatarUrl ?? undefined}
        alt={displayName}
        sx={sidebarSx.userAvatar}
      >
        {initial}
      </Avatar>
      <Typography component="span" noWrap className="sidebar-nav-item__label">
        {displayName}
      </Typography>
    </Box>
  );

  if (collapsed) {
    return (
      <Tooltip title={displayName} placement="right">
        {profileLink}
      </Tooltip>
    );
  }

  return profileLink;
}
