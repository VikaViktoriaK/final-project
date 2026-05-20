"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { authFormStyles } from "../styles/auth-form.styles";

type AuthFormPanelProps = {
  children: ReactNode;
};

function AuthFormPanel({ children }: AuthFormPanelProps) {
  return <Box sx={authFormStyles.authPanel}>{children}</Box>;
}

export default AuthFormPanel;
