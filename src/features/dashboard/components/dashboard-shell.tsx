"use client";

import type { ReactNode } from "react";
import { AppPageLayout } from "@/features/users/components/sidebar/AppPageLayout";

type DashboardShellProps = {
  children: ReactNode;
};

function DashboardShell({ children }: DashboardShellProps) {
  return <AppPageLayout>{children}</AppPageLayout>;
}

export default DashboardShell;
