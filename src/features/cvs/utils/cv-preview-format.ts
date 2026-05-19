import type { MasteryLevel } from "../types";
import type { GroupedSkills } from "./group-skills";
import formatCvDate from "./format-date";

const MASTERY_EXPERIENCE_YEARS: Record<MasteryLevel, number> = {
  Novice: 1,
  Advanced: 2,
  Competent: 3,
  Proficient: 4,
  Expert: 5,
};

function masteryToExperienceYears(mastery: MasteryLevel): number {
  return MASTERY_EXPERIENCE_YEARS[mastery];
}

function formatCvPeriod(
  start: string | null | undefined,
  end: string | null | undefined,
): string {
  const toPeriodPart = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${month}.${date.getFullYear()}`;
  };

  if (!start) {
    return "—";
  }

  const startPart = toPeriodPart(start);
  if (!end) {
    return `${startPart} – Till now`;
  }

  return `${startPart} – ${toPeriodPart(end)}`;
}

function formatLanguageLine(name: string, proficiency: string): string {
  return `${name} — ${proficiency}`;
}

type SkillTableRow = {
  categoryLabel: string;
  skillName: string;
  experienceYears: number;
  lastUsed: string;
};

function buildSkillTableRows(grouped: GroupedSkills[]): SkillTableRow[] {
  const currentYear = String(new Date().getFullYear());

  return grouped.flatMap((group) =>
    group.skills
      .filter((skill): skill is NonNullable<typeof skill> =>
        Boolean(skill?.name),
      )
      .map((skill) => ({
        categoryLabel: group.categoryLabel,
        skillName: skill.name,
        experienceYears: masteryToExperienceYears(skill.mastery),
        lastUsed: currentYear,
      })),
  );
}

function formatProjectEnvironment(environment: string[]): string {
  return environment.length ? environment.join(", ") : "—";
}

function formatProjectRoles(roles: string[]): string {
  return roles.length ? roles.join(", ") : "—";
}

export {
  buildSkillTableRows,
  formatCvPeriod,
  formatCvDate,
  formatLanguageLine,
  formatProjectEnvironment,
  formatProjectRoles,
  masteryToExperienceYears,
};
export type { SkillTableRow };
