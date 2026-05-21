"use client";

import { Button, Stack } from "@mui/material";
import NextLink from "next/link";
import { authFormStyles } from "../styles/auth-form.styles";

type AuthFormTabsProps = {
  active: "login" | "registration";
};

function AuthFormTabs({ active }: AuthFormTabsProps) {
  const isLoginActive = active === "login";
  const isSignUpActive = active === "registration";

  return (
    <Stack direction="row" spacing={0} sx={authFormStyles.tabs}>
      <Button
        type="button"
        component={NextLink}
        href="/login"
        sx={[authFormStyles.tab, isLoginActive && authFormStyles.activeTab]}
      >
        Sign in
      </Button>
      <Button
        type="button"
        component={NextLink}
        href="/registration"
        sx={[authFormStyles.tab, isSignUpActive && authFormStyles.activeTab]}
      >
        Sign up
      </Button>
    </Stack>
  );
}

export default AuthFormTabs;
