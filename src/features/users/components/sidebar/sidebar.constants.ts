import type { SvgIconComponent } from "@mui/icons-material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const SIDEBAR_STORAGE_KEY = "hrm_sidebar_collapsed";

export const SIDEBAR_WIDTH_EXPANDED = 240;
export const SIDEBAR_WIDTH_COLLAPSED = 72;

export const SIDEBAR_COLOR_BG = "#333333";
export const SIDEBAR_NAV_ITEM_HEIGHT = 56;

/** Matches project-wide tablet/desktop split (see usersTable.styles) */
export const SIDEBAR_DESKTOP_MEDIA = "@media (min-width: 768px)";

/** Reserved space for the fixed bottom tab bar on mobile */
export const SIDEBAR_BOTTOM_BAR_HEIGHT = 80;

export type SidebarNavItem = {
  id: string;
  label: string;
  icon: SvgIconComponent;
  href: string | ((userId: string | null) => string);
  isActive: (pathname: string) => boolean;
  /** When false, the item is shown but does not navigate yet. */
  navigable?: boolean;
  /** When false, hidden in the bottom tab bar (still shown in desktop sidebar). */
  showInMobileBar?: boolean;
};

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  {
    id: "employees",
    label: "Employees",
    icon: PeopleOutlinedIcon,
    href: "/users",
    isActive: (pathname) => pathname === "/users",
    navigable: true,
  },
  {
    id: "skills",
    label: "Skills",
    icon: TrendingUpIcon,
    href: (userId) => (userId ? `/users/${userId}/profile` : "/users"),
    isActive: (pathname) => pathname.endsWith("/profile"),
    navigable: false,
  },
  {
    id: "languages",
    label: "Languages",
    icon: TranslateIcon,
    href: (userId) => (userId ? `/users/${userId}/languages` : "/users"),
    isActive: (pathname) => pathname.endsWith("/languages"),
    navigable: false,
  },
  {
    id: "cvs",
    label: "CVs",
    icon: ArticleOutlinedIcon,
    href: "/users",
    isActive: (pathname) => pathname.startsWith("/cvs"),
    navigable: false,
    showInMobileBar: false,
  },
];
