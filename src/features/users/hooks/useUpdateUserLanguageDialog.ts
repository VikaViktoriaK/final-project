import * as React from "react";
import { useUpdateProfileLanguageMutation } from "@/features/users/api/userLanguages";
import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";
import { formatMutationError } from "@/shared/utils/formatMutationError";

type UseUpdateUserLanguageDialogParams = {
  userId: string;
  language: UserLanguageRow;
  onClose: () => void;
  onCompleted: () => Promise<unknown> | void;
};

export function useUpdateUserLanguageDialog({
  userId,
  language,
  onClose,
  onCompleted,
}: UseUpdateUserLanguageDialogParams) {
  const [proficiency, setProficiency] = React.useState(language.proficiency);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [updateLanguage, { loading: saving }] =
    useUpdateProfileLanguageMutation();

  const handleSubmit = React.useCallback(async () => {
    setSubmitError(null);
    if (proficiency === language.proficiency) {
      return;
    }
    try {
      await updateLanguage({
        variables: {
          language: {
            userId,
            name: language.name,
            proficiency,
          },
        },
      });
      await onCompleted();
      onClose();
    } catch (err) {
      setSubmitError(formatMutationError(err));
    }
  }, [
    language.name,
    language.proficiency,
    onClose,
    onCompleted,
    proficiency,
    updateLanguage,
    userId,
  ]);

  return {
    proficiency,
    setProficiency,
    submitError,
    saving,
    handleSubmit,
  };
}
