import { useQuery } from "@apollo/client/react";
import { CVS_QUERY } from "../graphql/cvs.query";
import type { CvsQueryData } from "../types/cv.types";

function useCv(cvId: string | undefined) {
  const { data, loading, error } = useQuery<CvsQueryData>(CVS_QUERY, {
    skip: !cvId,
  });

  const cv =
    cvId && data?.cvs ? (data.cvs.find((c) => c.id === cvId) ?? null) : null;

  return { cv, loading, error };
}

export default useCv;
