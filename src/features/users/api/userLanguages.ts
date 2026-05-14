import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import type {
  LanguageCatalogItem,
  ProfileEntity,
  UserLanguageRow,
} from "../types/userLanguages.types";

/**
 * Languages live on the profile document (see `addProfileLanguage` / etc. on the API).
 * There is typically no root `languages(userId)` field — that mismatch caused HTTP 400.
 */
export const GET_PROFILE_WITH_LANGUAGES = gql`
  query ProfileWithLanguages($userId: ID!) {
    profile(userId: $userId) {
      id
      first_name
      last_name
      languages {
        name
        proficiency
      }
    }
  }
`;

export type ProfileWithLanguages = ProfileEntity & {
  languages?: UserLanguageRow[] | null;
};

type ProfileWithLanguagesResponse = {
  profile: ProfileWithLanguages | null;
};

export type ProfileMutationPayload = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  languages?: UserLanguageRow[] | null;
};

type AddProfileLanguageMutationData = {
  addProfileLanguage: ProfileMutationPayload;
};

type DeleteProfileLanguageMutationData = {
  deleteProfileLanguage: ProfileMutationPayload;
};

export function useProfileWithLanguagesQuery(userId: string, enabled: boolean) {
  return useQuery<ProfileWithLanguagesResponse>(GET_PROFILE_WITH_LANGUAGES, {
    variables: { userId },
    skip: !userId || !enabled,
  });
}

/** Root catalog of languages the user can add (field name must match your schema). */
export const GET_LANGUAGE_CATALOG = gql`
  query LanguageCatalog {
    languages {
      id
      name
    }
  }
`;

type LanguageCatalogResponse = {
  languages: LanguageCatalogItem[];
};

export function useLanguageCatalogQuery(enabled: boolean) {
  return useQuery<LanguageCatalogResponse>(GET_LANGUAGE_CATALOG, {
    skip: !enabled,
  });
}

export const ADD_PROFILE_LANGUAGE = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      first_name
      last_name
      languages {
        name
        proficiency
      }
    }
  }
`;

export const DELETE_PROFILE_LANGUAGE = gql`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
      first_name
      last_name
      languages {
        name
        proficiency
      }
    }
  }
`;

export type AddProfileLanguageVariables = {
  language: {
    userId: string;
    name: string;
    proficiency: string;
  };
};

export type DeleteProfileLanguageVariables = {
  language: {
    userId: string;
    name: string;
  };
};

export function useAddProfileLanguageMutation() {
  return useMutation<
    AddProfileLanguageMutationData,
    AddProfileLanguageVariables
  >(ADD_PROFILE_LANGUAGE);
}

export function useDeleteProfileLanguageMutation() {
  return useMutation<
    DeleteProfileLanguageMutationData,
    DeleteProfileLanguageVariables
  >(DELETE_PROFILE_LANGUAGE);
}
