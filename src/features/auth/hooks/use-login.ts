"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type LoginFormValues } from "../schemas/login.schema";
import { useLazyQuery } from "@apollo/client/react";
import { LOGIN_QUERY } from "../graphql/login.query";
import { saveAuthTokens } from "../lib/auth-storage";
import type { LoginQueryData, LoginQueryVariables } from "../types/auth.types";
import { extractGraphqlErrorMessage } from "@/shared/utils/formatMutationError";

const LOGIN_FAILED_MESSAGE =
  "Unable to sign in. Please check your credentials and try again.";

function getLoginErrorMessage(error: unknown): string {
  const message = extractGraphqlErrorMessage(error);
  return message === "Bad Request" ? LOGIN_FAILED_MESSAGE : message;
}

function useLogin() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [login, { loading, error: queryError }] = useLazyQuery<
    LoginQueryData,
    LoginQueryVariables
  >(LOGIN_QUERY, {
    fetchPolicy: "no-cache",
  });

  const loginUser = async (data: LoginFormValues) => {
    setLoginError(null);

    try {
      const result = await login({ variables: { auth: data } });
      const authResult = result.data?.login;

      if (authResult) {
        saveAuthTokens(
          authResult.access_token,
          authResult.refresh_token,
          authResult.user,
        );
        router.push("/users");
        return;
      }

      console.error("Login failed: no auth result returned", result);
      setLoginError(LOGIN_FAILED_MESSAGE);
    } catch (error) {
      console.error("Error logging in", error);
      setLoginError(getLoginErrorMessage(error));
    }
  };

  const error = queryError ?? (loginError ? { message: loginError } : null);

  return { loading, error, loginUser };
}

export default useLogin;
