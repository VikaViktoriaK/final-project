import type { SxProps, Theme } from "@mui/material/styles";

export const dashboardStyles = {
  root: {
    display: "flex",
    minHeight: "100dvh",
    bgcolor: "var(--app-bg)",
    color: "var(--app-text)",
  },

  sidebar: {
    width: 240,
    flexShrink: 0,
    bgcolor: "var(--app-sidebar-bg)",
    borderRight: "1px solid var(--app-divider)",
    display: "flex",
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
    fontWeight: 700,
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
    px: { xs: 2, md: 4 },
    py: { xs: 2, md: 3 },
  },
} satisfies Record<string, SxProps<Theme>>;
