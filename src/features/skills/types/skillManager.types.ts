import type { MutationResult } from "@/lib/mutation-result";

type SkillManagerCategory = {
  id: string;
  name: string;
  parent?: { id: string; name: string } | null;
  children?: { id: string; name: string }[];
};

type SkillManagerCatalogSkill = {
  id: string;
  name: string;
  category?: {
    id: string;
    name?: string | null;
    parent?: { id: string; name: string } | null;
  } | null;
};

type SkillManagerItem<TMastery extends string = string> = {
  name: string;
  categoryId: string | null;
  mastery: TMastery;
};

type SkillManagerGroup<TMastery extends string = string> = {
  categoryLabel: string;
  skills: SkillManagerItem<TMastery>[];
};

type SkillManagerMutationInput<TMastery extends string = string> = {
  name: string;
  categoryId?: string | null;
  mastery: TMastery;
};

type SkillManagerMutations<TMastery extends string = string> = {
  addSkill: (
    input: SkillManagerMutationInput<TMastery>,
  ) => Promise<MutationResult>;
  updateSkill: (
    input: SkillManagerMutationInput<TMastery>,
  ) => Promise<MutationResult>;
  removeSkills: (names: string[]) => Promise<MutationResult>;
};

export type {
  SkillManagerCatalogSkill,
  SkillManagerCategory,
  SkillManagerGroup,
  SkillManagerItem,
  SkillManagerMutationInput,
  SkillManagerMutations,
};
