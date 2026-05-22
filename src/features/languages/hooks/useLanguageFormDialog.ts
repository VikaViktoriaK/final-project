import * as React from "react";
import { useLanguageDialogLabels } from "@/i18n/hooks/use-language-dialog-labels";
import { useTranslation } from "@/i18n/use-translation";
import type { LanguageRow } from "@/features/languages/types";
import type {
  LanguageFormMode,
  LanguageFormValues,
} from "@/features/languages/types/languageForm.types";
import { formatMutationError } from "@/shared/utils/formatMutationError";

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
  const { t } = useTranslation();
  const dialogLabels = useLanguageDialogLabels();
  const labels = mode === "create" ? dialogLabels.create : dialogLabels.edit;

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
      setSubmitError(t("languages.validation.enterName"));
      return;
    }
    if (!trimmedNative) {
      setSubmitError(t("languages.validation.enterNativeName"));
      return;
    }
    if (!trimmedIso2) {
      setSubmitError(t("languages.validation.enterIso2"));
      return;
    }
    if (trimmedIso2.length !== 2) {
      setSubmitError(t("languages.validation.iso2Length"));
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
      setSubmitError(formatMutationError(err));
    }
  }, [iso2, name, nativeName, onClose, onSubmit, t, unchanged]);

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
