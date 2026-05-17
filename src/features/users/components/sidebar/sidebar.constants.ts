import type { SvgIconComponent } from "@mui/icons-material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

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
  /** Active only for the signed-in user's own section, not when viewing another user. */
  isActive: (pathname: string, currentUserId: string | null) => boolean;
  /** When false, the item is shown but does not navigate yet. */
  navigable?: boolean;
  /** When false, hidden in the bottom tab bar (still shown in desktop sidebar). */
  showInMobileBar?: boolean;
};

function isOwnUserSection(
  pathname: string,
  currentUserId: string | null,
  section: "profile" | "skills" | "languages",
): boolean {
  if (!currentUserId) return false;
  return pathname === `/users/${currentUserId}/${section}`;
}

export type SidebarNavSection = {
  items: SidebarNavItem[];
};

const employeesNavItem: SidebarNavItem = {
  id: "employees",
  label: "Employees",
  icon: PeopleOutlinedIcon,
  href: "/users",
  isActive: (pathname) => pathname === "/users",
  navigable: true,
};

const skillsNavItem: SidebarNavItem = {
  id: "skills",
  label: "Skills",
  icon: TrendingUpIcon,
  href: (userId) => (userId ? `/users/${userId}/skills` : "/users"),
  isActive: (pathname, currentUserId) =>
    isOwnUserSection(pathname, currentUserId, "skills"),
  navigable: true,
};

const languagesNavItem: SidebarNavItem = {
  id: "languages",
  label: "Languages",
  icon: TranslateIcon,
  href: (userId) => (userId ? `/users/${userId}/languages` : "/users"),
  isActive: (pathname, currentUserId) =>
    isOwnUserSection(pathname, currentUserId, "languages"),
  navigable: false,
};

/** Default sidebar for non-admin users */
export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  employeesNavItem,
  skillsNavItem,
  languagesNavItem,
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

/** Admin sidebar: catalog (top) + reference data (bottom), separated by a divider */
export const ADMIN_SIDEBAR_SECTIONS: SidebarNavSection[] = [
  {
    items: [
      employeesNavItem,
      {
        id: "projects",
        label: "Projects",
        icon: FolderOutlinedIcon,
        href: "/projects",
        isActive: (pathname) => pathname.startsWith("/projects"),
        navigable: false,
        showInMobileBar: false,
      },
      {
        id: "cvs",
        label: "CVs",
        icon: ArticleOutlinedIcon,
        href: "/cvs",
        isActive: (pathname) => pathname.startsWith("/cvs"),
        navigable: false,
        showInMobileBar: false,
      },
    ],
  },
  {
    items: [
      {
        id: "departments",
        label: "Departments",
        icon: CorporateFareOutlinedIcon,
        href: "/departments",
        isActive: (pathname) => pathname.startsWith("/departments"),
        navigable: true,
        showInMobileBar: false,
      },
      {
        id: "positions",
        label: "Positions",
        icon: WorkOutlineOutlinedIcon,
        href: "/positions",
        isActive: (pathname) => pathname.startsWith("/positions"),
        navigable: false,
        showInMobileBar: false,
      },
      skillsNavItem,
      languagesNavItem,
    ],
  },
];
