"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { authFormStyles } from "../styles/auth-form.styles";

type AuthGateScreenProps = {
  message: string;
};

function AuthGateScreen({ message }: AuthGateScreenProps) {
  return (
    <Box sx={authFormStyles.gatePageContainer}>
      <Box sx={authFormStyles.gateContent}>
        <CircularProgress aria-label={message} color="primary" />
        <Typography sx={authFormStyles.gateMessage}>{message}</Typography>
      </Box>
    </Box>
  );
}

export default AuthGateScreen;
