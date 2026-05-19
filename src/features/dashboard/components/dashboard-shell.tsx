"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import DashboardMobileNav from "./dashboard-mobile-nav";
import DashboardSidebar from "./dashboard-sidebar";
import { dashboardStyles } from "../styles/dashboard.styles";

type DashboardShellProps = {
  children: ReactNode;
};

function DashboardShell({ children }: DashboardShellProps) {
  return (
    <Box sx={dashboardStyles.root}>
      <DashboardSidebar />
      <Box sx={dashboardStyles.main}>
        <Box sx={dashboardStyles.mainContent}>{children}</Box>
        <DashboardMobileNav />
      </Box>
    </Box>
  );
}

export default DashboardShell;
