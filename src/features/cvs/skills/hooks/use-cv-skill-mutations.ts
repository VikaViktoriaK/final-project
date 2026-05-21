"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { runMutation, type MutationResult } from "@/lib/mutation-result";
import cvRefetch from "../../shared/graphql/cv-refetch";
import {
  ADD_CV_SKILL_MUTATION,
  DELETE_CV_SKILLS_MUTATION,
  UPDATE_CV_SKILL_MUTATION,
} from "../graphql/cv-skills.mutation";
import { SKILL_CATEGORIES_QUERY, SKILLS_QUERY } from "../graphql/skills.query";
import type { MasteryLevel, Skill, SkillCategory } from "../../shared/types";

function useCvSkillCatalog() {
  const { data: categoriesData } = useQuery<{
    skillCategories: SkillCategory[];
  }>(SKILL_CATEGORIES_QUERY);
  const { data: skillsData } = useQuery<{ skills: Skill[] }>(SKILLS_QUERY);

  const allSkills = useMemo(
    () =>
      (skillsData?.skills ?? []).map((skill) => ({
        ...skill,
        id: String(skill.id),
      })),
    [skillsData?.skills],
  );

  return {
    categories: categoriesData?.skillCategories ?? [],
    allSkills,
  };
}

function useCvSkillMutations(cvId: string) {
  const refetch = cvRefetch(cvId);

  const [addSkill, { loading: adding }] = useMutation(ADD_CV_SKILL_MUTATION, {
    refetchQueries: refetch,
  });

  const [deleteSkills, { loading: deleting }] = useMutation(
    DELETE_CV_SKILLS_MUTATION,
    { refetchQueries: refetch },
  );

  const [updateSkill, { loading: updating }] = useMutation(
    UPDATE_CV_SKILL_MUTATION,
    { refetchQueries: refetch },
  );

  const addCvSkill = async (input: {
    name: string;
    categoryId?: string;
    mastery: MasteryLevel;
  }): Promise<MutationResult> =>
    runMutation(async () => {
      await addSkill({
        variables: {
          skill: {
            cvId,
            name: input.name,
            categoryId: input.categoryId,
            mastery: input.mastery,
          },
        },
      });
    }, "Failed to add skill");

  const updateCvSkill = async (input: {
    name: string;
    categoryId?: string | null;
    mastery: MasteryLevel;
  }): Promise<MutationResult> =>
    runMutation(async () => {
      await updateSkill({
        variables: {
          skill: {
            cvId,
            name: input.name,
            categoryId: input.categoryId ?? undefined,
            mastery: input.mastery,
          },
        },
      });
    }, "Failed to update skill");

  const removeCvSkills = async (names: string[]): Promise<MutationResult> =>
    runMutation(async () => {
      await deleteSkills({
        variables: { skill: { cvId, name: names } },
      });
    }, "Failed to remove skills");

  return {
    addCvSkill,
    updateCvSkill,
    removeCvSkills,
    loading: adding || updating || deleting,
  };
}

export { useCvSkillCatalog, useCvSkillMutations };
