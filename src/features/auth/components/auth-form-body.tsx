"use client";

import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import { authFormStyles } from "../styles/auth-form.styles";

type AuthFormBodyProps = {
  children: ReactNode;
  standalone?: boolean;
};

function AuthFormBody({ children, standalone = false }: AuthFormBodyProps) {
  return (
    <Stack
      sx={[
        authFormStyles.formBody,
        standalone && authFormStyles.formBodyStandalone,
      ]}
    >
      {children}
    </Stack>
  );
}

export default AuthFormBody;
