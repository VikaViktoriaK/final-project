import { Stack, Typography } from "@mui/material";
import NextLink from "next/link";

function ForgotPasswordForm() {
  return (
    <Stack spacing={2} component="form" noValidate>
      <Typography variant="h2" component="h1">
        Forgot password?
      </Typography>
      <NextLink href="/login">Sign in</NextLink>
    </Stack>
  );
}

export default ForgotPasswordForm;
