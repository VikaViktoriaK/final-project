import { groupSkillsByCategory } from "./group-skills";
import type { SkillCategory, SkillMastery } from "../types";

const categories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    order: 1,
    parent: null,
    children: [{ id: "react-category", name: "React" }],
  },
  {
    id: "backend",
    name: "Backend",
    order: 2,
    parent: null,
    children: [],
  },
];

const skills: SkillMastery[] = [
  { name: "React", categoryId: "react-category", mastery: "Advanced" },
  { name: "Node", categoryId: "backend", mastery: "Competent" },
  { name: "Unknown", categoryId: "missing", mastery: "Novice" },
  { name: "", categoryId: "frontend", mastery: "Novice" },
];

describe("groupSkillsByCategory", () => {
  it("groups skills by parent category labels and skips nameless skills", () => {
    const grouped = groupSkillsByCategory(skills, categories);

    expect(grouped).toEqual([
      { categoryLabel: "Frontend", skills: [skills[0]] },
      { categoryLabel: "Backend", skills: [skills[1]] },
      { categoryLabel: "Other", skills: [skills[2]] },
    ]);
  });
});
