"use client";
import { useMutation } from "@apollo/client/react";
import { SIGNUP_MUTATION } from "../graphql/signup.mutation";
import type {
  SignupMutationData,
  SignupMutationVariables,
} from "../types/auth.types";
import { type SignupFormValues } from "../schemas/signup.schema";
import { useRouter } from "next/navigation";
function useRegistration() {
  const router = useRouter();
  const [signup, { loading, error }] = useMutation<
    SignupMutationData,
    SignupMutationVariables
  >(SIGNUP_MUTATION);

  const registerUser = async (data: SignupFormValues) => {
    const result = await signup({
      variables: { auth: { email: data.email, password: data.password } },
    });
    if (result.data?.signup) {
      router.push("/login");
    }
  };
  return { loading, error, registerUser };
}
export default useRegistration;
