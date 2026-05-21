"use client";

import { useMemo } from "react";
import { useCvContext } from "../../shared/context/cv-context";
import {
  useCvSkillCatalog,
  useCvSkillMutations,
} from "./use-cv-skill-mutations";
import useSkillManager from "@/features/skills/hooks/useSkillManager";
import type { MasteryLevel } from "../../shared/types";

function useCvSkillsPage() {
  const { cv, cvId, canEdit } = useCvContext();
  const { categories, allSkills } = useCvSkillCatalog();
  const {
    addCvSkill,
    updateCvSkill,
    removeCvSkills,
    loading: mutating,
  } = useCvSkillMutations(cvId);

  const mutations = useMemo(
    () => ({
      addSkill: (input: {
        name: string;
        categoryId?: string | null;
        mastery: MasteryLevel;
      }) =>
        addCvSkill({
          name: input.name,
          categoryId: input.categoryId ?? undefined,
          mastery: input.mastery,
        }),
      updateSkill: updateCvSkill,
      removeSkills: removeCvSkills,
    }),
    [addCvSkill, removeCvSkills, updateCvSkill],
  );

  return useSkillManager<MasteryLevel>({
    currentSkills: cv?.skills ?? [],
    catalogSkills: allSkills,
    categories,
    canEdit,
    loading: mutating,
    defaultMastery: "Competent",
    mutations,
  });
}

export default useCvSkillsPage;
