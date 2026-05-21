"use client";

import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/features/auth/lib/auth-storage";
import { runMutation, type MutationResult } from "@/lib/mutation-result";
import { CREATE_CV_MUTATION } from "../graphql/create-cv.mutation";
import { DELETE_CV_MUTATION } from "../graphql/delete-cv.mutation";
import { CVS_QUERY } from "../graphql/cvs.query";
import type { CreateCvFormValues } from "../schemas/create-cv.schema";
import type { Cv } from "../../shared/types";

function useCreateCvMutation() {
  const [createCvMutation, { loading }] = useMutation<{ createCv: Cv }>(
    CREATE_CV_MUTATION,
    {
      refetchQueries: [{ query: CVS_QUERY }],
    },
  );

  const createCv = async (
    data: CreateCvFormValues,
  ): Promise<MutationResult<Cv>> =>
    runMutation(async () => {
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
      const cv = result.data?.createCv;
      if (!cv) {
        throw new Error("CV was not created");
      }
      return cv;
    }, "Failed to create CV");

  return { createCv, loading };
}

function useDeleteCvMutation() {
  const router = useRouter();
  const [deleteCvMutation, { loading }] = useMutation<{
    deleteCv: { affected: number };
  }>(DELETE_CV_MUTATION, {
    refetchQueries: [{ query: CVS_QUERY }],
  });

  const deleteCv = async (cvId: string): Promise<MutationResult> =>
    runMutation(async () => {
      const result = await deleteCvMutation({
        variables: { cv: { cvId } },
      });
      if (!result.data?.deleteCv?.affected) {
        throw new Error("CV was not deleted");
      }
      router.push("/cvs");
    }, "Failed to delete CV");

  return { deleteCv, loading };
}

export { useCreateCvMutation, useDeleteCvMutation };
