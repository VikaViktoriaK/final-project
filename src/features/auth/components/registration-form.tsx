"use client";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormValues } from "../schemas/signup.schema";
import useRegistration from "../hooks/use-registration";
import { authFormStyles } from "../styles/auth-form.styles";
import AuthFormBody from "./auth-form-body";
import AuthFormTabs from "./auth-form-tabs";
import { useState } from "react";

function RegistrationForm() {
  const { loading, error, registerUser } = useRegistration();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isPending = isSubmitting || loading;
  const passwordInputType = showPassword ? "text" : "password";
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password";
  const passwordVisibilityLabel = showPassword
    ? "Hide password"
    : "Show password";
  const confirmPasswordVisibilityLabel = showConfirmPassword
    ? "Hide password"
    : "Show password";

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((current) => !current);
  };

  return (
    <Stack
      sx={authFormStyles.form}
      onSubmit={handleSubmit(registerUser)}
      component="form"
      noValidate
    >
      <AuthFormTabs active="registration" />
      <AuthFormBody>
        <Box sx={authFormStyles.headerText}>
          <Typography variant="h2" component="h1" sx={authFormStyles.title}>
            Sign up
          </Typography>
          <Typography sx={authFormStyles.subtitle}>
            Create an account to continue
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
        <TextField
          sx={authFormStyles.textField}
          type={passwordInputType}
          placeholder="Password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete="new-password"
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
        <TextField
          sx={authFormStyles.textField}
          type={confirmPasswordInputType}
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          autoComplete="new-password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label={confirmPasswordVisibilityLabel}
                    edge="end"
                    onClick={toggleConfirmPasswordVisibility}
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
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={20} /> : "Sign up"}
        </Button>
        <Link component={NextLink} href="/login" sx={authFormStyles.textAction}>
          I have an account
        </Link>
        {error && (
          <Alert sx={authFormStyles.formAlert} severity="error">
            {error.message}
          </Alert>
        )}
      </AuthFormBody>
    </Stack>
  );
}

export default RegistrationForm;
