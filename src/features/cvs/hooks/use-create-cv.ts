"use client";

import { useMutation } from "@apollo/client/react";
import { CREATE_CV_MUTATION } from "../graphql/create-cv.mutation";
import { CVS_QUERY } from "../graphql/cvs.query";
import { getAuthUser } from "@/features/auth/lib/auth-storage";
import type {
  CreateCvMutationData,
  CreateCvMutationVariables,
} from "../types/cv.types";
import type { CreateCvFormValues } from "../schemas/create-cv.schema";

function useCreateCv() {
  const [createCvMutation, { loading, error }] = useMutation<
    CreateCvMutationData,
    CreateCvMutationVariables
  >(CREATE_CV_MUTATION, {
    refetchQueries: [{ query: CVS_QUERY }],
  });

  const createCv = async (data: CreateCvFormValues) => {
    const authUser = getAuthUser();
    const result = await createCvMutation({
      variables: {
        cv: {
          name: data.name,
          education: data.education,
          description: data.description,
          ...(authUser ? { userId: authUser.id } : {}),
        },
      },
    });

    return result.data?.createCv;
  };

  return { createCv, loading, error };
}

export default useCreateCv;
