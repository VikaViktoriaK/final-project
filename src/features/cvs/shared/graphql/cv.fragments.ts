import { gql } from "@apollo/client";

export const CV_USER_FIELDS = gql`
  fragment CvUserFields on User {
    id
    email
  }
`;

export const CV_PROJECT_FIELDS = gql`
  fragment CvProjectFields on CvProject {
    id
    name
    internal_name
    description
    domain
    start_date
    end_date
    environment
    roles
    responsibilities
    project {
      id
      name
      internal_name
      domain
      description
      start_date
      end_date
      environment
    }
  }
`;

export const CV_CORE_FIELDS = gql`
  fragment CvCoreFields on Cv {
    id
    created_at
    name
    education
    description
    user {
      ...CvUserFields
    }
  }
  ${CV_USER_FIELDS}
`;

export const CV_FULL_FIELDS = gql`
  fragment CvFullFields on Cv {
    ...CvCoreFields
    skills {
      name
      categoryId
      mastery
    }
    languages {
      name
      proficiency
    }
    projects {
      ...CvProjectFields
    }
  }
  ${CV_CORE_FIELDS}
  ${CV_PROJECT_FIELDS}
`;
