import { gql } from "@apollo/client";

export const SKILL_CATEGORIES_QUERY = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      order
      parent {
        id
        name
      }
      children {
        id
        name
      }
    }
  }
`;

export const SKILLS_QUERY = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
        name
        parent {
          id
          name
        }
      }
    }
  }
`;
