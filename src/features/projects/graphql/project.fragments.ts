import { gql } from "@apollo/client";

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    name
    internal_name
    domain
    description
    start_date
    end_date
    environment
  }
`;
