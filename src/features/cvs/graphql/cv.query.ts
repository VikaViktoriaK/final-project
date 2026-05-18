import { gql } from "@apollo/client";
import { CV_FULL_FIELDS } from "./cv.fragments";

export const CV_QUERY = gql`
  query Cv($cvId: ID!) {
    cv(cvId: $cvId) {
      ...CvFullFields
    }
  }
  ${CV_FULL_FIELDS}
`;
