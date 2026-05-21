import { gql } from "@apollo/client";
import { CV_CORE_FIELDS } from "../../shared/graphql/cv.fragments";

export const CVS_QUERY = gql`
  query Cvs {
    cvs {
      ...CvCoreFields
    }
  }
  ${CV_CORE_FIELDS}
`;
