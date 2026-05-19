import type { SxProps, Theme } from "@mui/material/styles";

export const dashboardStyles = {
  root: {
    display: "flex",
    minHeight: "100dvh",
    bgcolor: "var(--app-surface)",
    color: "var(--app-text)",
  },

  sidebar: {
    display: { xs: "none", md: "flex" },
    width: 240,
    flexShrink: 0,
    bgcolor: "var(--app-surface)",
    borderRight: "1px solid var(--app-divider)",
    flexDirection: "column",
    py: 2,
    transition: "width 0.2s",
    overflow: "hidden",
  },

  sidebarCollapsed: {
    width: 72,
  },

  navList: {
    px: 1.5,
    flex: 1,
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    px: 2,
    py: 1.25,
    borderRadius: "24px",
    color: "var(--app-text-muted)",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    transition: "background-color 0.2s, color 0.2s",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--app-overlay-06)",
        color: "var(--app-text)",
      },
    },
  },

  navItemActive: {
    bgcolor: "var(--app-overlay-12)",
    color: "var(--app-text)",
  },

  userSection: {
    px: 2,
    py: 1.5,
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    borderTop: "1px solid var(--app-divider)",
    mt: "auto",
  },

  userName: {
    flex: 1,
    fontSize: 13,
  },

  logoutButton: {
    color: "var(--app-text-muted)",
    minWidth: 0,
    p: 0.5,
  },

  iconButton: {
    color: "var(--app-text-muted)",
    minWidth: 0,
    p: 0.5,
  },

  userAvatar: {
    width: 36,
    height: 36,
    bgcolor: "var(--color-primary)",
    fontSize: 14,
    fontWeight: 500,
  },

  main: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  mainContent: {
    flex: 1,
    overflow: "auto",
    bgcolor: "var(--app-surface)",
    px: { xs: 2, md: 4 },
    py: { xs: 2, md: 3 },
  },

  /** Bottom bar on small screens — 56px, equal flex spacing, icons-only when tight. */
  mobileNav: {
    display: { xs: "flex", md: "none" },
    flexShrink: 0,
    height: 56,
    alignItems: "center",
    borderTop: "1px solid var(--app-divider)",
    bgcolor: "var(--app-surface)",
    px: 1,
    containerType: "inline-size",
    containerName: "mobile-nav",
  },

  mobileNavInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    minWidth: 0,
    gap: 0.5,
  },

  mobileNavItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.75,
    flex: "1 1 0",
    minWidth: 0,
    maxWidth: "100%",
    px: { xs: 0.75, sm: 1.5 },
    py: 1,
    borderRadius: "24px",
    color: "var(--app-text-muted)",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "24px",
    transition: "background-color 0.2s, color 0.2s",
    "@media (hover: hover)": {
      "&:hover": {
        bgcolor: "var(--app-overlay-06)",
        color: "var(--app-text)",
      },
    },
  },

  mobileNavItemActive: {
    bgcolor: "var(--app-overlay-12)",
    color: "var(--app-text)",
  },

  mobileNavItemLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "@container mobile-nav (max-width: 640px)": {
      display: "none",
    },
  },

  mobileNavUser: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 1 0",
    minWidth: 0,
    gap: 0.75,
    px: { xs: 0.5, sm: 1 },
  },

  mobileNavUserButton: {
    p: 0,
    minWidth: 0,
  },

  mobileNavUserName: {
    fontSize: 13,
    color: "var(--app-text)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 88,
    "@container mobile-nav (max-width: 640px)": {
      display: "none",
    },
  },
} satisfies Record<string, SxProps<Theme>>;
