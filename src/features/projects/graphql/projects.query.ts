import { gql } from "@apollo/client";
import { PROJECT_FIELDS } from "./project.fragments";

export const PROJECTS_QUERY = gql`
  query Projects {
    projects {
      ...ProjectFields
    }
  }
  ${PROJECT_FIELDS}
`;
