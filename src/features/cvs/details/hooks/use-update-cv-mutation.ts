"use client";

import { useMutation } from "@apollo/client/react";
import { runMutation, type MutationResult } from "@/lib/mutation-result";
import { CVS_QUERY } from "../../list/graphql/cvs.query";
import cvRefetch from "../../shared/graphql/cv-refetch";
import { UPDATE_CV_MUTATION } from "../graphql/update-cv.mutation";
import type { UpdateCvFormValues } from "../schemas/update-cv.schema";
import type { Cv } from "../../shared/types";

function useUpdateCvMutation(cvId: string) {
  const [updateCvMutation, { loading }] = useMutation<{ updateCv: Cv }>(
    UPDATE_CV_MUTATION,
    {
      refetchQueries: [{ query: CVS_QUERY }, ...cvRefetch(cvId)],
    },
  );

  const updateCv = async (
    values: Omit<UpdateCvFormValues, "cvId">,
  ): Promise<MutationResult<Cv>> =>
    runMutation(async () => {
      const result = await updateCvMutation({
        variables: {
          cv: {
            cvId,
            name: values.name.trim(),
            education: values.education.trim(),
            description: values.description.trim(),
          },
        },
      });
      const cv = result.data?.updateCv;
      if (!cv) {
        throw new Error("CV was not updated");
      }
      return cv;
    }, "Failed to update CV");

  return { updateCv, loading };
}

export default useUpdateCvMutation;
