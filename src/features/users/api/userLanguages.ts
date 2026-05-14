import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type {
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

export function useProfileWithLanguagesQuery(userId: string, enabled: boolean) {
  return useQuery<ProfileWithLanguagesResponse>(GET_PROFILE_WITH_LANGUAGES, {
    variables: { userId },
    skip: !userId || !enabled,
  });
}
