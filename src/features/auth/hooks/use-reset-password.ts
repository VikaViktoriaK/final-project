"use client";

import type {
  ResetPasswordMutationData,
  ResetPasswordMutationVariables,
} from "../types/auth.types";
import { RESET_PASSWORD_MUTATION } from "../graphql/reset-password.mutation";
import { useMutation } from "@apollo/client/react";
import { type ResetPasswordFormValues } from "../schemas/reset-password.schema";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
function useResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isSuccess, setIsSuccess] = useState(false);
  const [resetPassword, { loading, error }] = useMutation<
    ResetPasswordMutationData,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD_MUTATION);

  const resetPasswordUser = async (data: ResetPasswordFormValues) => {
    try {
      if (!token) {
        throw new Error("Token is required");
      }
      setIsSuccess(false);
      await resetPassword({
        variables: { auth: { newPassword: data.newPassword } },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
  };
  return { loading, error, resetPasswordUser, isSuccess, token };
}
export default useResetPassword;
