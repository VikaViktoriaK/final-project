import { gql } from "@apollo/client";
import { CV_CORE_FIELDS } from "../../shared/graphql/cv.fragments";

export const UPDATE_CV_MUTATION = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      ...CvCoreFields
    }
  }
  ${CV_CORE_FIELDS}
`;
