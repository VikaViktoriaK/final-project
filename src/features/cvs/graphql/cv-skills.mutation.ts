import { gql } from "@apollo/client";
import { CV_FULL_FIELDS } from "./cv.fragments";

export const ADD_CV_SKILL_MUTATION = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      ...CvFullFields
    }
  }
  ${CV_FULL_FIELDS}
`;

export const DELETE_CV_SKILLS_MUTATION = gql`
  mutation DeleteCvSkills($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      ...CvFullFields
    }
  }
  ${CV_FULL_FIELDS}
`;
