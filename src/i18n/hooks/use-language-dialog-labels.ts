import { useMemo } from "react";
import { useTranslation } from "@/i18n/use-translation";

export function useLanguageDialogLabels() {
  const { locale, t } = useTranslation();

  return useMemo(
    () => ({
      create: {
        title: t("languages.dialog.createTitle"),
        nameLabel: t("common.name"),
        nativeNameLabel: t("languages.field.nativeName"),
        iso2Label: t("languages.field.iso2"),
        cancel: t("common.cancel"),
        confirm: t("common.create"),
      },
      edit: {
        title: t("languages.dialog.editTitle"),
        nameLabel: t("common.name"),
        nativeNameLabel: t("languages.field.nativeName"),
        iso2Label: t("languages.field.iso2"),
        cancel: t("common.cancel"),
        confirm: t("common.update"),
      },
      delete: {
        title: t("languages.dialog.deleteTitle"),
        cancel: t("common.cancel"),
        confirm: t("common.delete"),
      },
    }),
    [locale, t],
  );
}
