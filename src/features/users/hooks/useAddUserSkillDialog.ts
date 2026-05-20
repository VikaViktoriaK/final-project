import * as React from "react";
import {
  useAddProfileSkillMutation,
  useSkillsCatalogQuery,
} from "@/features/users/api/userSkills";
import { skillNotOnProfile } from "@/features/users/components/user-profile/userSkills.utils";
import {
  SkillMastery,
  getSkillMasteryCatalog,
} from "@/features/users/constants/userSkills.mastery";
import type { ProfileSkillRow } from "@/features/users/types/userSkills.types";
import { formatMutationError } from "@/shared/utils/formatMutationError";

type UseAddUserSkillDialogParams = {
  userId: string;
  currentSkills: ProfileSkillRow[];
  onClose: () => void;
  onCompleted: () => Promise<unknown> | void;
};

export function useAddUserSkillDialog({
  userId,
  currentSkills,
  onClose,
  onCompleted,
}: UseAddUserSkillDialogParams) {
  const [skillName, setSkillName] = React.useState("");
  const [mastery, setMastery] = React.useState<string>(SkillMastery.Novice);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { catalog: skillsCatalog, loading: skillsLoading } =
    useSkillsCatalogQuery(true);
  const masteryCatalog = React.useMemo(() => getSkillMasteryCatalog(), []);
  const [addSkill, { loading: saving }] = useAddProfileSkillMutation();

  const addable = skillsCatalog.filter((item) =>
    skillNotOnProfile(item.name, currentSkills),
  );

  const selectedCatalogItem = skillsCatalog.find(
    (item) => item.name === skillName,
  );

  const handleSubmit = React.useCallback(async () => {
    setSubmitError(null);
    if (!skillName.trim() || !selectedCatalogItem) {
      setSubmitError("Select a skill.");
      return;
    }
    try {
      await addSkill({
        variables: {
          skill: {
            userId,
            name: selectedCatalogItem.name,
            categoryId: selectedCatalogItem.categoryId,
            mastery,
          },
        },
      });
      await onCompleted();
      onClose();
    } catch (err) {
      setSubmitError(formatMutationError(err));
    }
  }, [
    addSkill,
    onClose,
    onCompleted,
    selectedCatalogItem,
    skillName,
    mastery,
    userId,
  ]);

  return {
    skillName,
    setSkillName,
    mastery,
    setMastery,
    submitError,
    skillsLoading,
    addable,
    masteryCatalog,
    saving,
    handleSubmit,
  };
}
