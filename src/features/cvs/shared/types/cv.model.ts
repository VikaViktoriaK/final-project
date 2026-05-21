import type { Project } from "@/features/projects/types";

export type { Project };

export type MasteryLevel =
  | "Novice"
  | "Advanced"
  | "Competent"
  | "Proficient"
  | "Expert";

export type ProficiencyLevel =
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "C1"
  | "C2"
  | "Native";

export type CvUser = {
  id: string;
  email: string;
};

export type SkillMastery = {
  name: string;
  categoryId: string | null;
  mastery: MasteryLevel;
};

export type LanguageProficiency = {
  name: string;
  proficiency: ProficiencyLevel;
};

export type CvProject = {
  id: string;
  name: string;
  internal_name: string;
  description: string;
  domain: string;
  start_date: string;
  end_date: string | null;
  environment: string[];
  roles: string[];
  responsibilities: string[];
  project: Project | null;
};

export type Cv = {
  id: string;
  created_at: string;
  name: string;
  education: string | null;
  description: string;
  user: CvUser | null;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
  projects: CvProject[];
};

export type SkillCategory = {
  id: string;
  name: string;
  order: number;
  parent: { id: string; name: string } | null;
  children: { id: string; name: string }[];
};

export type Skill = {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    parent: { id: string; name: string } | null;
  } | null;
};
