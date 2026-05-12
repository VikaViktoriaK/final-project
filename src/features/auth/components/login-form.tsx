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

  return (
    <Stack
      sx={authFormStyles.form}
      onSubmit={handleSubmit(loginUser)}
      component="form"
      noValidate
    >
      <Stack direction="row" sx={authFormStyles.tabs}>
        <Button sx={[authFormStyles.tab, authFormStyles.activeTab]}>
          Sign in
        </Button>
        <Button
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
        type={showPassword ? "text" : "password"}
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
      <Button
        sx={authFormStyles.submitButton}
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || loading}
      >
        {loading ? <CircularProgress size={20} /> : "Sign in"}
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
