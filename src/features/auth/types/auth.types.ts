import type { LoginFormValues } from "../schemas/login.schema";

type AuthUser = {
  id: string;
  email: string;
  role: string;
  profile: {
    full_name: string;
    avatar: string | null;
  };
};

type AuthResult = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};

type ForgotPasswordMutationData = {
  forgotPassword: null;
};

type ForgotPasswordMutationVariables = {
  auth: { email: string };
};

type LoginQueryData = {
  login: AuthResult;
};

type LoginQueryVariables = {
  auth: LoginFormValues;
};

type SignupMutationData = {
  signup: AuthResult;
};

type SignupMutationVariables = {
  auth: { email: string; password: string };
};

type ResetPasswordMutationData = {
  resetPassword: null;
};

type ResetPasswordMutationVariables = {
  auth: { newPassword: string };
};

export type {
  AuthUser,
  AuthResult,
  ForgotPasswordMutationData,
  ForgotPasswordMutationVariables,
  LoginQueryData,
  LoginQueryVariables,
  SignupMutationData,
  SignupMutationVariables,
  ResetPasswordMutationData,
  ResetPasswordMutationVariables,
};
