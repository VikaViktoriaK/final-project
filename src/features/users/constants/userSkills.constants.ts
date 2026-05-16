import { SkillMastery } from "@/features/users/constants/userSkills.mastery";
import type {
  NormalizedSkillCatalogItem,
  SkillCategoryCatalogItem,
  UserSkillCategory,
} from "@/features/users/types/userSkills.types";

/** Fallback when `skillCategories` query is empty */
export const FALLBACK_SKILL_CATEGORIES: SkillCategoryCatalogItem[] = [
  { id: "1", name: "Programming languages" },
  { id: "2", name: "Frontend" },
  { id: "3", name: "Frontend technologies" },
  { id: "4", name: "State management libraries" },
];

/** Fallback when `skills` catalog query is empty */
export const FALLBACK_SKILL_CATALOG: NormalizedSkillCatalogItem[] = [
  { id: "javascript", name: "JavaScript", categoryId: "1" },
  { id: "typescript", name: "TypeScript", categoryId: "1" },
  { id: "python", name: "Python", categoryId: "1" },
  { id: "html5", name: "HTML5", categoryId: "2" },
  { id: "css3", name: "CSS3", categoryId: "2" },
  { id: "react", name: "React", categoryId: "2" },
  { id: "storybook", name: "Storybook", categoryId: "2" },
];

/** Demo profile skills matching the UI mock (progress bar colors / levels) */
export const MOCK_USER_SKILL_CATEGORIES: UserSkillCategory[] = [
  {
    id: "1",
    title: "Programming languages",
    skills: [
      {
        id: "javascript",
        name: "JavaScript",
        categoryId: "1",
        categoryName: "Programming languages",
        mastery: SkillMastery.Competent,
        progressColor: "#81c784",
      },
      {
        id: "typescript",
        name: "TypeScript",
        categoryId: "1",
        categoryName: "Programming languages",
        mastery: SkillMastery.Proficient,
        progressColor: "#ffca28",
      },
    ],
  },
  {
    id: "2",
    title: "Frontend",
    skills: [
      {
        id: "html5",
        name: "HTML5",
        categoryId: "2",
        categoryName: "Frontend",
        mastery: SkillMastery.Expert,
        progressColor: "#ef5350",
      },
      {
        id: "css3",
        name: "CSS3",
        categoryId: "2",
        categoryName: "Frontend",
        mastery: SkillMastery.Expert,
        progressColor: "#ef5350",
      },
      {
        id: "react",
        name: "React",
        categoryId: "2",
        categoryName: "Frontend",
        mastery: SkillMastery.Expert,
        progressColor: "#ef5350",
      },
    ],
  },
];

export const USER_SKILLS_ADD_LABEL = "Add skill";
export const USER_SKILLS_REMOVE_LABEL = "Remove skills";

export const ADD_SKILL_DIALOG_LABELS = {
  title: "Add skill",
  skillField: "Skill",
  masteryField: "Skill mastery",
  cancel: "CANCEL",
  confirm: "CONFIRM",
} as const;

export const UPDATE_SKILL_DIALOG_LABELS = {
  title: "Update skill",
  skillField: "Skill",
  masteryField: "Skill mastery",
  cancel: "CANCEL",
  confirm: "CONFIRM",
} as const;

export const CONFIRM_BULK_REMOVE_SKILLS_LABELS = {
  title: "Delete skills",
  cancel: "CANCEL",
  delete: "DELETE",
} as const;
