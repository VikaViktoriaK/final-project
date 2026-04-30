"use client";
import { TextField, Button, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

function LoginForm() {
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

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <Stack
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
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
        disabled={isSubmitting}
      >
        Sign in
      </Button>
    </Stack>
  );
}

export default LoginForm;
