import { gql } from "@apollo/client";

export const CVS_QUERY = gql`
  query Cvs {
    cvs {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`;
