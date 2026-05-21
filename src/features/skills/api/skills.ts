import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import type { SkillCategoryOption, SkillRow } from "../types";

export const GET_SKILLS = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
        name
      }
    }
  }
`;

export const GET_SKILL_CATEGORIES = gql`
  query SkillCategories {
    skillCategories {
      id
      name
    }
  }
`;

export const CREATE_SKILL = gql`
  mutation CreateSkill($skill: CreateSkillInput!) {
    createSkill(skill: $skill) {
      id
      name
      category {
        id
        name
      }
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($skill: UpdateSkillInput!) {
    updateSkill(skill: $skill) {
      id
      name
      category {
        id
        name
      }
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($skill: DeleteSkillInput!) {
    deleteSkill(skill: $skill) {
      affected
    }
  }
`;

type SkillApiItem = {
  id: string;
  name: string;
  category?: { id: string; name?: string | null } | null;
};

type SkillsResponse = {
  skills: SkillApiItem[];
};

type SkillCategoriesResponse = {
  skillCategories: SkillCategoryOption[];
};

type CreateSkillVariables = {
  skill: { name: string; categoryId: string };
};

type UpdateSkillVariables = {
  skill: { skillId: string; name: string; categoryId: string };
};

type DeleteSkillVariables = {
  skill: { skillId: string };
};

function toSkillRow(
  item: SkillApiItem,
  categories: SkillCategoryOption[],
): SkillRow {
  const categoryId = item.category?.id?.trim() ?? "";
  const categoryName =
    item.category?.name?.trim() ||
    categories.find((c) => c.id === categoryId)?.name ||
    "—";

  return {
    id: item.id,
    name: item.name,
    categoryId,
    categoryName,
  };
}

export function useSkillsCatalogQuery() {
  const skillsQuery = useQuery<SkillsResponse>(GET_SKILLS);
  const categoriesQuery =
    useQuery<SkillCategoriesResponse>(GET_SKILL_CATEGORIES);

  const categories = categoriesQuery.data?.skillCategories ?? [];

  const skills: SkillRow[] = (skillsQuery.data?.skills ?? []).map((item) =>
    toSkillRow(item, categories),
  );

  const loading = skillsQuery.loading || categoriesQuery.loading;
  const error = skillsQuery.error ?? categoriesQuery.error;

  const refetch = async () => {
    await Promise.all([skillsQuery.refetch(), categoriesQuery.refetch()]);
  };

  return {
    skills,
    categories,
    loading,
    error,
    refetch,
  };
}

export function useCreateSkillMutation() {
  return useMutation<unknown, CreateSkillVariables>(CREATE_SKILL);
}

export function useUpdateSkillMutation() {
  return useMutation<unknown, UpdateSkillVariables>(UPDATE_SKILL);
}

export function useDeleteSkillMutation() {
  return useMutation<unknown, DeleteSkillVariables>(DELETE_SKILL);
}
