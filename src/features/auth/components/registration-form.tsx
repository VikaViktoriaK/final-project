"use client";
import {
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormValues } from "../schemas/signup.schema";
import { useMutation } from "@apollo/client/react";
import { SIGNUP_MUTATION } from "../graphql/signup.mutation";

function RegistrationForm() {
  const router = useRouter();
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
  type SignupQueryData = {
    signup: {
      access_token: string;
      refresh_token: string;
      user: {
        id: string;
        email: string;
        role: string;
        profile: {
          full_name: string;
          avatar: string | null;
        };
      };
    };
  };

  type SignupQueryVariables = {
    auth: { email: string; password: string };
  };

  const [signup, { loading, error }] = useMutation<
    SignupQueryData,
    SignupQueryVariables
  >(SIGNUP_MUTATION);

  const onSubmit = async (data: SignupFormValues) => {
    const result = await signup({
      variables: { auth: { email: data.email, password: data.password } },
    });
    if (result.data?.signup) {
      router.push("/login");
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
        Sign up
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
      <TextField
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || loading}
      >
        {loading ? <CircularProgress size={20} /> : "Sign up"}
      </Button>
      {error && <Alert severity="error">{error.message}</Alert>}
    </Stack>
  );
}

export default RegistrationForm;
