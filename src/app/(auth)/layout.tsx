"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import AuthGateScreen from "@/features/auth/components/auth-gate-screen";
import useGuestOnly from "@/features/auth/hooks/use-guest-only";
import { authFormStyles } from "@/features/auth/styles/auth-form.styles";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  const { isGuest, isChecking } = useGuestOnly();

  if (isChecking) {
    return <AuthGateScreen message="Checking your session…" />;
  }

  if (!isGuest) {
    return <AuthGateScreen message="You are already signed in. Redirecting…" />;
  }

  return (
    <Box sx={authFormStyles.pageContainer}>
      <Box sx={authFormStyles.formContainer}>{children}</Box>
    </Box>
  );
}

export default AuthLayout;
