import { gql } from "@apollo/client";
import { CV_FULL_FIELDS } from "./cv.fragments";

export const UPDATE_CV_MUTATION = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      ...CvFullFields
    }
  }
  ${CV_FULL_FIELDS}
`;
