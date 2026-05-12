"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/reset-password.schema";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NextLink from "next/link";
import useResetPassword from "../hooks/use-reset-password";
import { authFormStyles } from "../styles/auth-form.styles";
import { useState } from "react";

function ResetPasswordForm() {
  const { loading, error, resetPasswordUser, isSuccess, token } =
    useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      sx={authFormStyles.centeredForm}
      component="form"
      onSubmit={handleSubmit(resetPasswordUser)}
      noValidate
    >
      <Box sx={authFormStyles.headerText}>
        <Typography variant="h2" component="h1" sx={authFormStyles.title}>
          Reset password
        </Typography>
        <Typography sx={authFormStyles.subtitle}>
          Enter your new password to continue
        </Typography>
      </Box>
      <TextField
        sx={authFormStyles.textField}
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        {...register("newPassword")}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        fullWidth
        autoComplete="new-password"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  edge="end"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        sx={authFormStyles.textField}
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm New Password"
        {...register("confirmNewPassword")}
        error={!!errors.confirmNewPassword}
        helperText={errors.confirmNewPassword?.message}
        fullWidth
        autoComplete="new-password"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  edge="end"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        sx={authFormStyles.submitButton}
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || loading || !token || isSuccess}
      >
        {loading ? <CircularProgress size={20} /> : "Reset Password"}
      </Button>
      <Link component={NextLink} href="/login" sx={authFormStyles.textAction}>
        Sign in
      </Link>
      {isSuccess && (
        <Alert severity="success">
          Password reset successfully. You can now sign in with your new
          password.
        </Alert>
      )}
      {error && <Alert severity="error">{error.message}</Alert>}
      {!token && <Alert severity="error">Token is required</Alert>}
    </Stack>
  );
}

export default ResetPasswordForm;
