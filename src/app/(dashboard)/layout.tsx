"use client";

import type { ReactNode } from "react";
import AuthGateScreen from "@/features/auth/components/auth-gate-screen";
import useRequireAuth from "@/features/auth/hooks/use-require-auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isChecking, isAuthorized } = useRequireAuth();

  if (isChecking) {
    return <AuthGateScreen message="Checking your session…" />;
  }

  if (!isAuthorized) {
    return <AuthGateScreen message="Redirecting to sign in…" />;
  }

  return <>{children}</>;
}

export default DashboardLayout;
