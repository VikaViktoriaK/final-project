"use client";
import { useRouter } from "next/navigation";
import { type LoginFormValues } from "../schemas/login.schema";
import { useLazyQuery } from "@apollo/client/react";
import { LOGIN_QUERY } from "../graphql/login.query";
import { saveAuthTokens } from "../lib/auth-storage";
import type { LoginQueryData, LoginQueryVariables } from "../types/auth.types";

function useLogin() {
  const router = useRouter();
  const [login, { loading, error }] = useLazyQuery<
    LoginQueryData,
    LoginQueryVariables
  >(LOGIN_QUERY, {
    fetchPolicy: "no-cache",
  });

  const loginUser = async (data: LoginFormValues) => {
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
      }
    } catch {
      console.error("Error logging in", error);
    }
  };

  return { loading, error, loginUser };
}

export default useLogin;
