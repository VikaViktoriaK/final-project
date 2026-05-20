import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import type { LanguageRow } from "../types";

export const GET_LANGUAGES = gql`
  query Languages {
    languages {
      id
      name
      native_name
      iso2
    }
  }
`;

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      id
      name
      native_name
      iso2
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($language: UpdateLanguageInput!) {
    updateLanguage(language: $language) {
      id
      name
      native_name
      iso2
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($language: DeleteLanguageInput!) {
    deleteLanguage(language: $language) {
      affected
    }
  }
`;

type LanguageApiItem = {
  id: string;
  name: string;
  native_name?: string | null;
  iso2?: string | null;
};

type LanguagesResponse = {
  languages: LanguageApiItem[];
};

type CreateLanguageVariables = {
  language: { name: string; native_name: string; iso2: string };
};

type UpdateLanguageVariables = {
  language: {
    languageId: string;
    name: string;
    native_name: string;
    iso2: string;
  };
};

type DeleteLanguageVariables = {
  language: { languageId: string };
};

function toLanguageRow(item: LanguageApiItem): LanguageRow {
  return {
    id: item.id,
    name: item.name,
    nativeName: item.native_name?.trim() ?? "",
    iso2: item.iso2?.trim() ?? "",
  };
}

export function useLanguagesQuery() {
  const query = useQuery<LanguagesResponse>(GET_LANGUAGES);

  const languages: LanguageRow[] = (query.data?.languages ?? []).map(
    toLanguageRow,
  );

  return { ...query, languages };
}

export function useCreateLanguageMutation() {
  return useMutation<unknown, CreateLanguageVariables>(CREATE_LANGUAGE);
}

export function useUpdateLanguageMutation() {
  return useMutation<unknown, UpdateLanguageVariables>(UPDATE_LANGUAGE);
}

export function useDeleteLanguageMutation() {
  return useMutation<unknown, DeleteLanguageVariables>(DELETE_LANGUAGE);
}
