import type { MasteryLevel } from "../types";

const MASTERY_PERCENT: Record<MasteryLevel, number> = {
  Novice: 20,
  Advanced: 40,
  Competent: 60,
  Proficient: 80,
  Expert: 100,
};

const MASTERY_BAR_COLOR: Record<MasteryLevel, string> = {
  Novice: "var(--color-primary)",
  Advanced: "var(--color-mastery-advanced)",
  Competent: "var(--color-primary)",
  Proficient: "var(--color-mastery-proficient)",
  Expert: "var(--color-mastery-expert)",
};

const MASTERY_LEVELS = [
  "Novice",
  "Advanced",
  "Competent",
  "Proficient",
  "Expert",
] as const satisfies readonly MasteryLevel[];

export { MASTERY_PERCENT, MASTERY_BAR_COLOR, MASTERY_LEVELS };
