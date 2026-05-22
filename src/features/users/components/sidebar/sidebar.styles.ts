import {
  SIDEBAR_BOTTOM_BAR_HEIGHT,
  SIDEBAR_DESKTOP_MEDIA,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
} from "./sidebar.constants";

export const sidebarSx = {
  root: (collapsed: boolean) => ({
    position: "fixed",
    zIndex: 1200,
    bgcolor: "var(--app-sidebar-bg, #333333)",
    boxSizing: "border-box",
    display: "flex",
    bottom: 0,
    left: 0,
    right: 0,
    top: "auto",
    width: "100%",
    height: "auto",
    minHeight: SIDEBAR_BOTTOM_BAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    [SIDEBAR_DESKTOP_MEDIA]: {
      top: 0,
      bottom: "auto",
      left: 0,
      right: "auto",
      width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
      minWidth: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
      height: "100dvh",
      maxHeight: "100dvh",
      minHeight: "100dvh",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch",
      py: 2.5,
      pl: 0,
      pr: collapsed ? 1 : 2,
      pb: 2.5,
      transition: "width 0.2s ease, min-width 0.2s ease, padding 0.2s ease",
    },
  }),
  navList: {
    display: "flex",
    flex: 1,
    minWidth: 0,
    width: "100%",
    [SIDEBAR_DESKTOP_MEDIA]: {
      flex: "none",
    },
  },
  footer: {
    display: "none",
    [SIDEBAR_DESKTOP_MEDIA]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: 1.5,
      width: "100%",
      minWidth: 0,
      overflow: "hidden",
      mt: 2,
      pl: 0,
      pr: 0,
    },
  },
  userAvatar: {
    width: 40,
    height: 40,
    flexShrink: 0,
    bgcolor: "#df4d4d",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
  },
  collapseBtn: (collapsed: boolean) => ({
    display: "none",
    [SIDEBAR_DESKTOP_MEDIA]: {
      display: "inline-flex",
      alignSelf: collapsed ? "center" : "flex-start",
      ml: collapsed ? 0 : 2,
      color: "var(--app-text-muted)",
      width: 40,
      height: 40,
      "&:hover": {
        bgcolor: "var(--app-nav-active-bg)",
        color: "var(--app-text)",
      },
    },
  }),
} as const;

export function sidebarPageLayoutSx(collapsed: boolean) {
  const sidebarWidth = collapsed
    ? SIDEBAR_WIDTH_COLLAPSED
    : SIDEBAR_WIDTH_EXPANDED;

  return {
    minHeight: "100vh",
    paddingBottom: `${SIDEBAR_BOTTOM_BAR_HEIGHT}px`,
    [SIDEBAR_DESKTOP_MEDIA]: {
      paddingBottom: 0,
      paddingLeft: `${sidebarWidth}px`,
      transition: "padding-left 0.2s ease",
    },
  };
}

export const sidebarMainSx = {
  minWidth: 0,
  width: "100%",
  minHeight: "100dvh",
  bgcolor: "var(--app-surface)",
  color: "var(--app-text)",
  boxSizing: "border-box",
  px: 2,
  py: 2,
  [SIDEBAR_DESKTOP_MEDIA]: {
    px: 3,
    py: 3,
  },
} as const;
