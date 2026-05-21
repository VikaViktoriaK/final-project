import type { LanguageRow } from "../types";

export type LanguageFormValues = {
  name: string;
  nativeName: string;
  iso2: string;
};

export type LanguageFormMode = "create" | "edit";

export function toLanguageFormValues(
  language: LanguageRow,
): LanguageFormValues {
  return {
    name: language.name,
    nativeName: language.nativeName,
    iso2: language.iso2,
  };
}
