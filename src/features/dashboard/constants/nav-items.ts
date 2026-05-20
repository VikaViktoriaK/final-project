import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

type DashboardNavItem = {
  label: string;
  href: string;
  icon: SvgIconComponent;
};

const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Employees", href: "/users", icon: PeopleOutlineIcon },
  { label: "Projects", href: "/projects", icon: FolderOutlinedIcon },
  { label: "CVs", href: "/cvs", icon: DescriptionOutlinedIcon },
  { label: "Skills", href: "/users", icon: ShowChartOutlinedIcon },
  { label: "Languages", href: "/users", icon: TranslateOutlinedIcon },
];

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/cvs") {
    return pathname.startsWith("/cvs");
  }
  if (href === "/projects") {
    return pathname.startsWith("/projects");
  }
  return pathname.startsWith(href);
}

export { DASHBOARD_NAV_ITEMS, isNavItemActive };
export type { DashboardNavItem };
