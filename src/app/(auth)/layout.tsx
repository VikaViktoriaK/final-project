"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import useGuestOnly from "@/features/auth/hooks/use-guest-only";
import { authFormStyles } from "@/features/auth/styles/auth-form.styles";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  const { isGuest, isChecking } = useGuestOnly();

  if (isChecking) {
    return null;
  }

  if (!isGuest) {
    return null;
  }

  return (
    <Box sx={authFormStyles.pageContainer}>
      <Box sx={authFormStyles.formContainer}>{children}</Box>
    </Box>
  );
}

export default AuthLayout;
