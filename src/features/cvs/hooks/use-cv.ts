import { useQuery } from "@apollo/client/react";
import { CV_QUERY } from "../graphql/cv.query";
import type { Cv } from "../types";

function useCv(cvId: string | undefined) {
  const { data, loading, error } = useQuery<{ cv: Cv }, { cvId: string }>(
    CV_QUERY,
    {
      variables: { cvId: cvId ?? "" },
      skip: !cvId,
    },
  );

  return { cv: data?.cv ?? null, loading, error };
}

export default useCv;
