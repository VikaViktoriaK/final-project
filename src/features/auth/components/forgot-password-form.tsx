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
import useForgotPassword from "../hooks/use-forgot-password";
function ForgotPasswordForm() {
  const { loading, error, forgotPasswordUser, isSuccess } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <Stack
      spacing={2}
      onSubmit={handleSubmit(forgotPasswordUser)}
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
