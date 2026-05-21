import { gql } from "@apollo/client";
import { PROJECT_FIELDS } from "./project.fragments";

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($project: CreateProjectInput!) {
    createProject(project: $project) {
      ...ProjectFields
    }
  }
  ${PROJECT_FIELDS}
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($project: UpdateProjectInput!) {
    updateProject(project: $project) {
      ...ProjectFields
    }
  }
  ${PROJECT_FIELDS}
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($project: DeleteProjectInput!) {
    deleteProject(project: $project) {
      affected
    }
  }
`;
