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
    const result = await login({ variables: { auth: data } });
    if (result.data?.login) {
      saveAuthTokens(
        result.data.login.access_token,
        result.data.login.refresh_token,
        result.data.login.user,
      );
      router.push("/users");
    }
  };
  return { loading, error, loginUser };
}

export default useLogin;
