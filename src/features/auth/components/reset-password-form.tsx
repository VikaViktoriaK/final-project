"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password.schema";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import NextLink from "next/link";
import useResetPassword from "../hooks/use-reset-password";

function ResetPasswordForm() {
  const { loading, error, resetPasswordUser, isSuccess, token } =
    useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={handleSubmit(resetPasswordUser)}
      noValidate
    >
      <TextField
        label="New Password"
        type="password"
        placeholder="New Password"
        {...register("newPassword")}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        fullWidth
        autoComplete="new-password"
      />
      <TextField
        label="Confirm New Password"
        type="password"
        placeholder="Confirm New Password"
        {...register("confirmNewPassword")}
        error={!!errors.confirmNewPassword}
        helperText={errors.confirmNewPassword?.message}
        fullWidth
        autoComplete="new-password"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || loading || !token || isSuccess}
      >
        {loading ? <CircularProgress size={20} /> : "Reset Password"}
      </Button>
      {isSuccess && (
        <Alert severity="success">
          Password reset successfully. You can now sign in with your new
          password.
        </Alert>
      )}
      {error && <Alert severity="error">{error.message}</Alert>}
      {!token && <Alert severity="error">Token is required</Alert>}
      <NextLink href="/login">Sign in</NextLink>
    </Stack>
  );
}

export default ResetPasswordForm;
