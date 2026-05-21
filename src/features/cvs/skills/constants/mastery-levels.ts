import type { MasteryLevel } from "../../shared/types";

const MASTERY_PERCENT: Record<MasteryLevel, number> = {
  Novice: 20,
  Advanced: 40,
  Competent: 60,
  Proficient: 80,
  Expert: 100,
};

/** Bar fill colors aligned with fill % (novice → expert). */
const MASTERY_BAR_COLOR: Record<MasteryLevel, string> = {
  Novice: "var(--color-mastery-novice)",
  Advanced: "var(--color-skill-bar)",
  Competent: "var(--color-mastery-proficient)",
  Proficient: "var(--color-mastery-advanced)",
  Expert: "var(--color-primary)",
};

const MASTERY_LEVELS = [
  "Novice",
  "Advanced",
  "Competent",
  "Proficient",
  "Expert",
] as const satisfies readonly MasteryLevel[];

export { MASTERY_PERCENT, MASTERY_BAR_COLOR, MASTERY_LEVELS };
