import type { Skill } from "@/features/cvs/types";

type CatalogSkillGroup = {
  categoryLabel: string;
  skills: Skill[];
};

function getSkillCatalogGroupLabel(skill: Skill): string {
  const category = skill.category;
  if (!category) {
    return "Other";
  }
  return category.parent?.name ?? category.name ?? "Other";
}

function sortCatalogSkills(skills: Skill[]): Skill[] {
  return [...skills].sort((left, right) => {
    const groupCompare = getSkillCatalogGroupLabel(left).localeCompare(
      getSkillCatalogGroupLabel(right),
    );
    if (groupCompare !== 0) {
      return groupCompare;
    }
    return left.name.localeCompare(right.name);
  });
}

function groupCatalogSkills(skills: Skill[]): CatalogSkillGroup[] {
  const groups: CatalogSkillGroup[] = [];

  for (const skill of sortCatalogSkills(skills)) {
    const categoryLabel = getSkillCatalogGroupLabel(skill);
    const last = groups[groups.length - 1];

    if (last?.categoryLabel === categoryLabel) {
      last.skills.push(skill);
      continue;
    }

    groups.push({ categoryLabel, skills: [skill] });
  }

  return groups;
}

export type { CatalogSkillGroup };
export { getSkillCatalogGroupLabel, groupCatalogSkills, sortCatalogSkills };
