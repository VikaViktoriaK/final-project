import * as React from "react";
import { useSkillDialogLabels } from "@/i18n/hooks/use-skill-dialog-labels";
import { useTranslation } from "@/i18n/use-translation";
import type { SkillCategoryOption, SkillRow } from "@/features/skills/types";
import type { SkillFormMode } from "@/features/skills/types/skillForm.types";
import { formatMutationError } from "@/shared/utils/formatMutationError";

type UseSkillFormDialogParams = {
  mode: SkillFormMode;
  skill: SkillRow | null;
  categories: SkillCategoryOption[];
  onClose: () => void;
  onSubmit: (values: { name: string; categoryId: string }) => Promise<void>;
};

export function useSkillFormDialog({
  mode,
  skill,
  categories,
  onClose,
  onSubmit,
}: UseSkillFormDialogParams) {
  const { t } = useTranslation();
  const dialogLabels = useSkillDialogLabels();
  const labels = mode === "create" ? dialogLabels.create : dialogLabels.edit;

  const [name, setName] = React.useState(() =>
    mode === "edit" && skill ? skill.name : "",
  );
  const [categoryId, setCategoryId] = React.useState(() =>
    mode === "edit" && skill ? skill.categoryId : (categories[0]?.id ?? ""),
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const trimmedName = name.trim();
  const unchanged = Boolean(
    mode === "edit" &&
    skill &&
    trimmedName === skill.name &&
    categoryId === skill.categoryId,
  );

  const confirmDisabled =
    !trimmedName || !categoryId || categories.length === 0 || unchanged;

  const handleSubmit = React.useCallback(async () => {
    if (!trimmedName) {
      setSubmitError(t("skills.validation.enterName"));
      return;
    }
    if (!categoryId) {
      setSubmitError(t("skills.validation.selectCategory"));
      return;
    }
    if (unchanged) {
      onClose();
      return;
    }
    setSubmitError(null);
    try {
      await onSubmit({ name: trimmedName, categoryId });
      onClose();
    } catch (err) {
      setSubmitError(formatMutationError(err));
    }
  }, [categoryId, onClose, onSubmit, t, trimmedName, unchanged]);

  return {
    labels,
    name,
    setName,
    categoryId,
    setCategoryId,
    submitError,
    confirmDisabled,
    handleSubmit,
  };
}
