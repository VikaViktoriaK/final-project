"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password.schema";
import { RESET_PASSWORD_MUTATION } from "../graphql/reset-password.mutation";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import NextLink from "next/link";

type ResetPasswordMutationData = {
  resetPassword: null;
};

type ResetPasswordMutationVariables = {
  auth: { newPassword: string };
};

function ResetPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });

  const [resetPassword, { loading, error }] = useMutation<
    ResetPasswordMutationData,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD_MUTATION);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      if (!token) {
        throw new Error("Token is required");
      }
      setIsSuccess(false);
      await resetPassword({
        variables: { auth: { newPassword: data.newPassword } },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
  };

  return (
    <Stack
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
