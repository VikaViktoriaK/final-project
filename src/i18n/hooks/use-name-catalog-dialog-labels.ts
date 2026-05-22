import { useMemo } from "react";
import { useTranslation } from "@/i18n/use-translation";
import type { MessageKey } from "@/i18n/messages";

export function useNameCatalogDialogLabels(
  createTitleKey: MessageKey,
  editTitleKey: MessageKey,
  nameLabelKey: MessageKey = "common.name",
) {
  const { locale, t } = useTranslation();

  return useMemo(
    () => ({
      create: {
        title: t(createTitleKey),
        nameLabel: t(nameLabelKey),
        cancel: t("common.cancel"),
        confirm: t("common.create"),
      },
      edit: {
        title: t(editTitleKey),
        nameLabel: t(nameLabelKey),
        cancel: t("common.cancel"),
        confirm: t("common.update"),
      },
      delete: {
        cancel: t("common.cancel"),
        confirm: t("common.delete"),
      },
    }),
    [createTitleKey, editTitleKey, locale, nameLabelKey, t],
  );
}
