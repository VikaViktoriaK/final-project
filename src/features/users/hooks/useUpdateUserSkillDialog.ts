import * as React from "react";
import { useUpdateProfileSkillMutation } from "@/features/users/api/userSkills";
import { getSkillMasteryCatalog } from "@/features/users/constants/userSkills.mastery";
import type { UserSkill } from "@/features/users/types/userSkills.types";
import { formatProfileSubmitError } from "@/features/users/utils/graphqlErrors";

type UseUpdateUserSkillDialogParams = {
  userId: string;
  skill: UserSkill;
  onClose: () => void;
  onCompleted: () => Promise<unknown> | void;
};

export function useUpdateUserSkillDialog({
  userId,
  skill,
  onClose,
  onCompleted,
}: UseUpdateUserSkillDialogParams) {
  const [mastery, setMastery] = React.useState(skill.mastery);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const masteryCatalog = React.useMemo(() => getSkillMasteryCatalog(), []);
  const [updateSkill, { loading: saving }] = useUpdateProfileSkillMutation();

  const handleSubmit = React.useCallback(async () => {
    setSubmitError(null);
    if (mastery === skill.mastery) {
      onClose();
      return;
    }
    try {
      await updateSkill({
        variables: {
          skill: {
            userId,
            name: skill.name,
            categoryId: skill.categoryId,
            mastery,
          },
        },
      });
      await onCompleted();
      onClose();
    } catch (err) {
      setSubmitError(formatProfileSubmitError(err));
    }
  }, [
    mastery,
    onClose,
    onCompleted,
    skill.categoryId,
    skill.mastery,
    skill.name,
    updateSkill,
    userId,
  ]);

  return {
    mastery,
    setMastery,
    submitError,
    masteryCatalog,
    saving,
    handleSubmit,
  };
}
