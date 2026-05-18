import { gql } from "@apollo/client";
import { CV_FULL_FIELDS } from "./cv.fragments";

export const ADD_CV_PROJECT_MUTATION = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      ...CvFullFields
    }
  }
  ${CV_FULL_FIELDS}
`;

export const UPDATE_CV_PROJECT_MUTATION = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      ...CvFullFields
    }
  }
  ${CV_FULL_FIELDS}
`;

export const REMOVE_CV_PROJECT_MUTATION = gql`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      ...CvFullFields
    }
  }
  ${CV_FULL_FIELDS}
`;
