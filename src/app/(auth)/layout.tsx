"use client";

import type { ReactNode } from "react";
import useGuestOnly from "@/features/auth/hooks/use-guest-only";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  const { isGuest } = useGuestOnly();

  if (!isGuest) {
    return null;
  }

  return <>{children}</>;
}

export default AuthLayout;
