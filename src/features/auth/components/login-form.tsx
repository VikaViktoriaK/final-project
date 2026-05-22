"use client";
import {
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authFormStyles } from "../styles/auth-form.styles";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, loginSchema } from "../schemas/login.schema";
import useLogin from "../hooks/use-login";
import AuthFormBody from "./auth-form-body";
import AuthFormTabs from "./auth-form-tabs";
import { useState } from "react";

function LoginForm() {
  const { loading, error, loginUser } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isPending = isSubmitting || loading;
  const passwordInputType = showPassword ? "text" : "password";
  const passwordVisibilityLabel = showPassword
    ? "Hide password"
    : "Show password";

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  return (
    <Stack
      sx={authFormStyles.form}
      onSubmit={handleSubmit(loginUser)}
      component="form"
      noValidate
      data-testid="login-form"
    >
      <AuthFormTabs active="login" />
      <AuthFormBody>
        <Box sx={authFormStyles.headerText}>
          <Typography variant="h2" component="h1" sx={authFormStyles.title}>
            Sign in
          </Typography>
          <Typography sx={authFormStyles.subtitle}>
            Welcome back. Sign in to continue
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
          slotProps={{
            htmlInput: { "data-testid": "login-email" },
          }}
        />
        <TextField
          sx={authFormStyles.textField}
          type={passwordInputType}
          placeholder="Password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete="current-password"
          slotProps={{
            htmlInput: { "data-testid": "login-password" },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label={passwordVisibilityLabel}
                    edge="end"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
          disabled={isPending}
          data-testid="login-submit"
        >
          {isPending ? <CircularProgress size={20} /> : "Sign in"}
        </Button>
        <Link
          component={NextLink}
          href="/forgot-password"
          sx={authFormStyles.textAction}
        >
          Forgot password
        </Link>
        {error && (
          <Alert
            sx={authFormStyles.formAlert}
            severity="error"
            data-testid="login-error"
          >
            {error.message}
          </Alert>
        )}
      </AuthFormBody>
    </Stack>
  );
}

export default LoginForm;
