"use client";

import type { ReactNode } from "react";
import useRequireAuth from "@/features/auth/hooks/use-require-auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isChecking, isAuthorized } = useRequireAuth();
  if (isChecking) {
    return null;
  }
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

export default DashboardLayout;
