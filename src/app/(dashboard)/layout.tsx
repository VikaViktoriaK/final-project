"use client";

import type { ReactNode } from "react";
import useRequireAuth from "@/features/auth/hooks/use-require-auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthorized } = useRequireAuth();

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

export default DashboardLayout;
