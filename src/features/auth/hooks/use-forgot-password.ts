"use client";
import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD_MUTATION } from "../graphql/forgot-password.mutation";
import { useState } from "react";
import type {
  ForgotPasswordMutationData,
  ForgotPasswordMutationVariables,
} from "../types/auth.types";
import { type ForgotPasswordFormValues } from "../schemas/forgot-password.schema";

function useForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgotPassword, { loading, error }] = useMutation<
    ForgotPasswordMutationData,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD_MUTATION);

  const forgotPasswordUser = async (data: ForgotPasswordFormValues) => {
    setIsSuccess(false);
    try {
      await forgotPassword({
        variables: { auth: { email: data.email } },
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
  };
  return { loading, error, forgotPasswordUser, isSuccess };
}
export default useForgotPassword;
