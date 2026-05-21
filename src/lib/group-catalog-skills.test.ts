import {
  getSkillCatalogGroupLabel,
  groupCatalogSkills,
  sortCatalogSkills,
} from "./group-catalog-skills";
import type { Skill } from "@/features/cvs/types";

const skills: Skill[] = [
  {
    id: "2",
    name: "React",
    category: {
      id: "react",
      name: "React",
      parent: { id: "frontend", name: "Frontend" },
    },
  },
  {
    id: "1",
    name: "Node",
    category: { id: "backend", name: "Backend", parent: null },
  },
  {
    id: "3",
    name: "Unknown",
    category: null,
  },
];

describe("group catalog skills", () => {
  it("derives group labels from parent or category name", () => {
    expect(getSkillCatalogGroupLabel(skills[0])).toBe("Frontend");
    expect(getSkillCatalogGroupLabel(skills[2])).toBe("Other");
  });

  it("sorts skills by group then name", () => {
    expect(sortCatalogSkills(skills).map((skill) => skill.name)).toEqual([
      "Node",
      "React",
      "Unknown",
    ]);
  });

  it("groups consecutive sorted skills under category labels", () => {
    expect(groupCatalogSkills(skills)).toEqual([
      { categoryLabel: "Backend", skills: [skills[1]] },
      { categoryLabel: "Frontend", skills: [skills[0]] },
      { categoryLabel: "Other", skills: [skills[2]] },
    ]);
  });
});
