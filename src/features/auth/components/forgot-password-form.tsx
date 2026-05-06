"use client";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/forgot-password.schema";
import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD_MUTATION } from "../graphql/forgot-password.mutation";
import { useState } from "react";
import {
  ForgotPasswordMutationData,
  ForgotPasswordMutationVariables,
} from "../types/auth.types";

function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const [forgotPassword, { loading, error }] = useMutation<
    ForgotPasswordMutationData,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD_MUTATION);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsSuccess(false);
    try {
      await forgotPassword({
        variables: { auth: { email: data.email } },
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
  };

  return (
    <Stack
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      noValidate
    >
      <Typography variant="h2" component="h1">
        Forgot password?
      </Typography>
      <NextLink href="/login">Sign in</NextLink>
      <TextField
        label="Email"
        type="email"
        placeholder="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        autoComplete="email"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || loading || isSuccess}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : isSuccess ? (
          "Sent"
        ) : (
          "Forgot password"
        )}
      </Button>
      {error && <Alert severity="error">{error.message}</Alert>}
      {isSuccess && (
        <Alert severity="success">
          If an account with this email exists, password reset instructions have
          been sent.
        </Alert>
      )}
    </Stack>
  );
}

export default ForgotPasswordForm;
