import * as React from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  FALLBACK_SKILL_CATALOG,
  FALLBACK_SKILL_CATEGORIES,
} from "@/features/users/constants/userSkills.constants";
import { normalizeCatalogItem } from "@/features/users/components/user-profile/userSkills.utils";
import type {
  NormalizedSkillCatalogItem,
  ProfileSkillRow,
  SkillCatalogItem,
  SkillCategoryCatalogItem,
} from "@/features/users/types/userSkills.types";

const PROFILE_SKILLS_FRAGMENT = `
  skills {
    name
    mastery
    categoryId
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

export const GET_SKILLS_CATALOG = gql`
  query SkillsCatalog {
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

export const GET_PROFILE_WITH_SKILLS = gql`
  query ProfileWithSkills($userId: ID!) {
    profile(userId: $userId) {
      id
      first_name
      last_name
      ${PROFILE_SKILLS_FRAGMENT}
    }
  }
`;

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      ${PROFILE_SKILLS_FRAGMENT}
    }
  }
`;

export const UPDATE_PROFILE_SKILL = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      ${PROFILE_SKILLS_FRAGMENT}
    }
  }
`;

export const DELETE_PROFILE_SKILL = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      ${PROFILE_SKILLS_FRAGMENT}
    }
  }
`;

type SkillCategoriesResponse = {
  skillCategories?: SkillCategoryCatalogItem[] | null;
};

type SkillsCatalogResponse = {
  skills?: SkillCatalogItem[] | null;
};

type ProfileWithSkillsResponse = {
  profile: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    skills?: ProfileSkillRow[] | null;
  } | null;
};

type ProfileSkillsMutationPayload = {
  id: string;
  skills?: ProfileSkillRow[] | null;
};

type AddProfileSkillMutationData = {
  addProfileSkill: ProfileSkillsMutationPayload;
};

type UpdateProfileSkillMutationData = {
  updateProfileSkill: ProfileSkillsMutationPayload;
};

type DeleteProfileSkillMutationData = {
  deleteProfileSkill: ProfileSkillsMutationPayload;
};

export function useSkillCategoriesQuery(enabled: boolean) {
  const query = useQuery<SkillCategoriesResponse>(GET_SKILL_CATEGORIES, {
    skip: !enabled,
  });

  const categories = React.useMemo(() => {
    const fromApi = query.data?.skillCategories;
    if (fromApi?.length) return fromApi;
    return FALLBACK_SKILL_CATEGORIES;
  }, [query.data?.skillCategories]);

  return { ...query, categories };
}

export function useSkillsCatalogQuery(enabled: boolean) {
  const query = useQuery<SkillsCatalogResponse>(GET_SKILLS_CATALOG, {
    skip: !enabled,
  });

  const catalog = React.useMemo((): NormalizedSkillCatalogItem[] => {
    const fromApi = query.data?.skills;
    if (fromApi?.length) {
      return fromApi.map(normalizeCatalogItem);
    }
    return FALLBACK_SKILL_CATALOG;
  }, [query.data?.skills]);

  return { ...query, catalog };
}

export function useProfileWithSkillsQuery(userId: string, enabled: boolean) {
  return useQuery<ProfileWithSkillsResponse>(GET_PROFILE_WITH_SKILLS, {
    variables: { userId },
    skip: !userId || !enabled,
  });
}

export type AddProfileSkillVariables = {
  skill: {
    userId: string;
    name: string;
    categoryId: string;
    mastery: string;
  };
};

export type UpdateProfileSkillVariables = {
  skill: {
    userId: string;
    name: string;
    categoryId: string;
    mastery: string;
  };
};

export type DeleteProfileSkillVariables = {
  skill: {
    userId: string;
    name: string[];
  };
};

export function useAddProfileSkillMutation() {
  return useMutation<AddProfileSkillMutationData, AddProfileSkillVariables>(
    ADD_PROFILE_SKILL,
  );
}

export function useUpdateProfileSkillMutation() {
  return useMutation<
    UpdateProfileSkillMutationData,
    UpdateProfileSkillVariables
  >(UPDATE_PROFILE_SKILL);
}

export function useDeleteProfileSkillMutation() {
  return useMutation<
    DeleteProfileSkillMutationData,
    DeleteProfileSkillVariables
  >(DELETE_PROFILE_SKILL);
}
