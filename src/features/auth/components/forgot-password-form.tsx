"use client";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
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
import { authFormStyles } from "../styles/auth-form.styles";
import AuthFormBody from "./auth-form-body";

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

  const isPending = isSubmitting || loading;
  const submitLabel = isSuccess ? "Sent" : "Forgot password";

  return (
    <Stack
      sx={authFormStyles.form}
      onSubmit={handleSubmit(forgotPasswordUser)}
      component="form"
      noValidate
    >
      <AuthFormBody standalone>
        <Box sx={authFormStyles.headerText}>
          <Typography variant="h2" component="h1" sx={authFormStyles.title}>
            Forgot password
          </Typography>
          <Typography sx={authFormStyles.subtitle}>
            We will send you an email with further instructions
          </Typography>
        </Box>
        <TextField
          sx={authFormStyles.textField}
          type="email"
          placeholder="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          autoComplete="email"
        />
        <Button
          sx={authFormStyles.submitButton}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPending || isSuccess}
        >
          {isPending ? <CircularProgress size={20} /> : submitLabel}
        </Button>
        <Link component={NextLink} href="/login" sx={authFormStyles.textAction}>
          Cancel
        </Link>
        {error && (
          <Alert sx={authFormStyles.formAlert} severity="error">
            {error.message}
          </Alert>
        )}
        {isSuccess && (
          <Alert sx={authFormStyles.formAlert} severity="success">
            If an account with this email exists, password reset instructions
            have been sent.
          </Alert>
        )}
      </AuthFormBody>
    </Stack>
  );
}

export default ForgotPasswordForm;
