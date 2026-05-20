"use client";

import Box from "@mui/material/Box";
import { AppSidebar } from "./AppSidebar";
import { sidebarMainSx, sidebarPageLayoutSx } from "./sidebar.styles";
import {
  SidebarCollapseProvider,
  useSidebarCollapse,
} from "./SidebarCollapseContext";

function AppPageLayoutInner({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebarCollapse();

  return (
    <Box sx={sidebarPageLayoutSx(collapsed)}>
      <AppSidebar />
      <Box component="main" sx={sidebarMainSx}>
        {children}
      </Box>
    </Box>
  );
}

export function AppPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarCollapseProvider>
      <AppPageLayoutInner>{children}</AppPageLayoutInner>
    </SidebarCollapseProvider>
  );
}
