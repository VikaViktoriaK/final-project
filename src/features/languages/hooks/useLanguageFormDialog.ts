import * as React from "react";
import {
  LANGUAGE_CREATE_DIALOG,
  LANGUAGE_EDIT_DIALOG,
} from "@/features/languages/constants/languages.constants";
import type { LanguageRow } from "@/features/languages/types";
import type {
  LanguageFormMode,
  LanguageFormValues,
} from "@/features/languages/types/languageForm.types";
import { formatProfileSubmitError } from "@/features/users/utils/graphqlErrors";

type UseLanguageFormDialogParams = {
  mode: LanguageFormMode;
  language: LanguageRow | null;
  onClose: () => void;
  onSubmit: (values: LanguageFormValues) => Promise<void>;
};

export function useLanguageFormDialog({
  mode,
  language,
  onClose,
  onSubmit,
}: UseLanguageFormDialogParams) {
  const labels =
    mode === "create" ? LANGUAGE_CREATE_DIALOG : LANGUAGE_EDIT_DIALOG;

  const [name, setName] = React.useState(() =>
    mode === "edit" && language ? language.name : "",
  );
  const [nativeName, setNativeName] = React.useState(() =>
    mode === "edit" && language ? language.nativeName : "",
  );
  const [iso2, setIso2] = React.useState(() =>
    mode === "edit" && language ? language.iso2 : "",
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const unchanged = Boolean(
    mode === "edit" &&
    language &&
    name.trim() === language.name &&
    nativeName.trim() === language.nativeName &&
    iso2.trim().toUpperCase() === language.iso2.toUpperCase(),
  );

  const handleSubmit = React.useCallback(async () => {
    const trimmedName = name.trim();
    const trimmedNative = nativeName.trim();
    const trimmedIso2 = iso2.trim().toUpperCase();

    if (!trimmedName) {
      setSubmitError("Enter a language name.");
      return;
    }
    if (!trimmedNative) {
      setSubmitError("Enter a native name.");
      return;
    }
    if (!trimmedIso2) {
      setSubmitError("Enter an ISO2 code.");
      return;
    }
    if (trimmedIso2.length !== 2) {
      setSubmitError("ISO2 code must be exactly 2 characters.");
      return;
    }

    if (unchanged) {
      onClose();
      return;
    }

    setSubmitError(null);
    try {
      await onSubmit({
        name: trimmedName,
        nativeName: trimmedNative,
        iso2: trimmedIso2,
      });
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  }, [iso2, name, nativeName, onClose, onSubmit, unchanged]);

  return {
    labels,
    name,
    setName,
    nativeName,
    setNativeName,
    iso2,
    setIso2,
    submitError,
    unchanged,
    handleSubmit,
  };
}
