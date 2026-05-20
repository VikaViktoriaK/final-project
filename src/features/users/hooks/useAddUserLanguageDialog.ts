import * as React from "react";
import {
  useAddProfileLanguageMutation,
  useLanguageCatalogQuery,
} from "@/features/users/api/userLanguages";
import { languageNotOnProfile } from "@/features/users/utils/userLanguages.utils";
import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";
import { formatMutationError } from "@/shared/utils/formatMutationError";

type UseAddUserLanguageDialogParams = {
  userId: string;
  currentLanguages: UserLanguageRow[];
  onClose: () => void;
  onCompleted: () => Promise<unknown> | void;
};

export function useAddUserLanguageDialog({
  userId,
  currentLanguages,
  onClose,
  onCompleted,
}: UseAddUserLanguageDialogParams) {
  const [languageName, setLanguageName] = React.useState("");
  const [proficiency, setProficiency] = React.useState("A1");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { data: catalogData, loading: catalogLoading } =
    useLanguageCatalogQuery(true);
  const [addLanguage, { loading: saving }] = useAddProfileLanguageMutation();

  const catalog = catalogData?.languages ?? [];
  const addable = catalog.filter((item) =>
    languageNotOnProfile(item.name, currentLanguages),
  );

  const handleSubmit = React.useCallback(async () => {
    setSubmitError(null);
    if (!languageName.trim()) {
      setSubmitError("Select a language.");
      return;
    }
    try {
      await addLanguage({
        variables: {
          language: {
            userId,
            name: languageName.trim(),
            proficiency,
          },
        },
      });
      await onCompleted();
      onClose();
    } catch (err) {
      setSubmitError(formatMutationError(err));
    }
  }, [addLanguage, languageName, onClose, onCompleted, proficiency, userId]);

  return {
    languageName,
    setLanguageName,
    proficiency,
    setProficiency,
    submitError,
    catalogLoading,
    addable,
    saving,
    handleSubmit,
  };
}
