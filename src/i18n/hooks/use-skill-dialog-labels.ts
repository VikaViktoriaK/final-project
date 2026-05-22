import { useMemo } from "react";
import { useTranslation } from "@/i18n/use-translation";

export function useSkillDialogLabels() {
  const { locale, t } = useTranslation();

  return useMemo(
    () => ({
      create: {
        title: t("skills.dialog.createTitle"),
        nameLabel: t("skills.field.skillName"),
        categoryLabel: t("skills.field.category"),
        cancel: t("common.cancel"),
        confirm: t("common.create"),
      },
      edit: {
        title: t("skills.dialog.editTitle"),
        nameLabel: t("skills.field.skillName"),
        categoryLabel: t("skills.field.category"),
        cancel: t("common.cancel"),
        confirm: t("common.update"),
      },
      delete: {
        title: t("skills.dialog.deleteTitle"),
        cancel: t("common.cancel"),
        confirm: t("common.delete"),
      },
    }),
    [locale, t],
  );
}
