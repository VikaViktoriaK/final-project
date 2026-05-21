import type {
  Cv,
  CvProject,
  SkillCategory,
  SkillMastery,
} from "../shared/types";

export const mockCvUser = {
  id: "user-1",
  email: "dev@example.com",
};

export const mockCv: Cv = {
  id: "cv-1",
  created_at: "2024-01-01T00:00:00.000Z",
  name: "Jane Developer",
  education: "BS Computer Science",
  description: "Full-stack developer with five years of experience.",
  user: mockCvUser,
  skills: [
    { name: "TypeScript", categoryId: "cat-1", mastery: "Proficient" },
    { name: "React", categoryId: "cat-2", mastery: "Expert" },
  ],
  languages: [{ name: "English", proficiency: "C1" }],
  projects: [],
};

export const mockCvProject: CvProject = {
  id: "proj-1",
  name: "Alpha Portal",
  internal_name: "alpha",
  description: "Customer portal redesign",
  domain: "FinTech",
  start_date: "2022-06-01",
  end_date: "2023-12-01",
  environment: ["React", "Node"],
  roles: ["Developer"],
  responsibilities: ["Implemented API layer"],
  project: null,
};

export const mockSkillCategories: SkillCategory[] = [
  {
    id: "cat-1",
    name: "Frontend",
    order: 1,
    parent: null,
    children: [{ id: "cat-2", name: "React", order: 1 }],
  },
];

export const mockSkill: SkillMastery = {
  name: "React",
  categoryId: "cat-2",
  mastery: "Advanced",
};
