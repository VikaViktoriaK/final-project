/**
 * Skill mastery levels (ascending). Values match DB / GraphQL enum labels.
 */
export enum SkillMastery {
  Novice = "Novice",
  Advanced = "Advanced",
  Competent = "Competent",
  Proficient = "Proficient",
  Expert = "Expert",
}

/** Canonical order for selects when the API does not return `order`. */
export const SKILL_MASTERY_ORDER: SkillMastery[] = [
  SkillMastery.Novice,
  SkillMastery.Advanced,
  SkillMastery.Competent,
  SkillMastery.Proficient,
  SkillMastery.Expert,
];

/** LinearProgress `value` (0–100): each step +20%. */
export const SKILL_MASTERY_PROGRESS_PERCENT: Record<SkillMastery, number> = {
  [SkillMastery.Novice]: 20,
  [SkillMastery.Advanced]: 40,
  [SkillMastery.Competent]: 60,
  [SkillMastery.Proficient]: 80,
  [SkillMastery.Expert]: 100,
};

/** Fill color by mastery level (increasing difficulty). */
export const SKILL_MASTERY_PROGRESS_COLOR: Record<SkillMastery, string> = {
  [SkillMastery.Novice]: "#9e9e9e",
  [SkillMastery.Advanced]: "#42a5f5",
  [SkillMastery.Competent]: "#81c784",
  [SkillMastery.Proficient]: "#ffca28",
  [SkillMastery.Expert]: "#ef5350",
};

/** Fill color keyed by LinearProgress `value` (20 … 100). */
export const MASTERY_PROGRESS_PERCENT_COLOR: Record<number, string> = {
  20: SKILL_MASTERY_PROGRESS_COLOR[SkillMastery.Novice],
  40: SKILL_MASTERY_PROGRESS_COLOR[SkillMastery.Advanced],
  60: SKILL_MASTERY_PROGRESS_COLOR[SkillMastery.Competent],
  80: SKILL_MASTERY_PROGRESS_COLOR[SkillMastery.Proficient],
  100: SKILL_MASTERY_PROGRESS_COLOR[SkillMastery.Expert],
};

const MASTERY_LOOKUP = new Map<string, SkillMastery>(
  SKILL_MASTERY_ORDER.map((level) => [level.toLowerCase(), level]),
);

export function parseSkillMastery(value: string): SkillMastery | null {
  const normalized = value.trim().toLowerCase();
  return MASTERY_LOOKUP.get(normalized) ?? null;
}

export function isSkillMastery(value: string): value is SkillMastery {
  return parseSkillMastery(value) !== null;
}

/** Maps a mastery label from the DB to MUI LinearProgress `value` (0–100). */
export function masteryToProgressPercent(mastery: string): number {
  const parsed = parseSkillMastery(mastery);
  if (!parsed) return 0;
  return SKILL_MASTERY_PROGRESS_PERCENT[parsed];
}

/** Maps mastery label or percent (20|40|60|80|100) to the progress bar fill color. */
export function masteryToProgressColor(
  masteryOrPercent: string | number,
): string {
  if (typeof masteryOrPercent === "number") {
    return (
      MASTERY_PROGRESS_PERCENT_COLOR[masteryOrPercent] ??
      SKILL_MASTERY_PROGRESS_COLOR[SkillMastery.Novice]
    );
  }
  const parsed = parseSkillMastery(masteryOrPercent);
  if (parsed) {
    return SKILL_MASTERY_PROGRESS_COLOR[parsed];
  }
  return masteryToProgressColor(masteryToProgressPercent(masteryOrPercent));
}

/** Mastery levels are not exposed on GraphQL Query — use the canonical list. */
export function getSkillMasteryCatalog(): { id: string; name: string }[] {
  return SKILL_MASTERY_ORDER.map((name) => ({ id: name, name }));
}
