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
    >
      <Stack direction="row" sx={authFormStyles.tabs}>
        <Button
          type="button"
          sx={[authFormStyles.tab, authFormStyles.activeTab]}
        >
          Sign in
        </Button>
        <Button
          type="button"
          component={NextLink}
          href="/registration"
          sx={authFormStyles.tab}
        >
          Sign up
        </Button>
      </Stack>
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
        fullWidth
        autoComplete="email"
      />
      <TextField
        sx={authFormStyles.textField}
        type={passwordInputType}
        placeholder="Password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        autoComplete="current-password"
        slotProps={{
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
      {error && <Alert severity="error">{error.message}</Alert>}
    </Stack>
  );
}

export default LoginForm;
