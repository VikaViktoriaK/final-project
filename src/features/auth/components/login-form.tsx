"use client";
import {
  TextField,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import NextLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, loginSchema } from "../schemas/login.schema";
import useLogin from "../hooks/use-login";
function LoginForm() {
  const { loading, error, loginUser } = useLogin();
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
      spacing={2}
      onSubmit={handleSubmit(loginUser)}
      component="form"
      noValidate
    >
      <Typography variant="h2" component="h1">
        Sign in
      </Typography>
      <NextLink href="/registration">Sign up</NextLink>
      <NextLink href="/forgot-password">Forgot password?</NextLink>
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
      <TextField
        label="Password"
        type="password"
        placeholder="Password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        autoComplete="current-password"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || loading}
      >
        {loading ? <CircularProgress size={20} /> : "Sign in"}
      </Button>
      {error && <Alert severity="error">{error.message}</Alert>}
    </Stack>
  );
}

export default LoginForm;
