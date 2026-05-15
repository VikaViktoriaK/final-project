import { useQuery } from "@apollo/client/react";
import { CVS_QUERY } from "../graphql/cvs.query";
import type { CvsQueryData } from "../types/cv.types";

function useCvs() {
  const { data, loading, error } = useQuery<CvsQueryData>(CVS_QUERY);
  return { data, loading, error };
}

export default useCvs;
