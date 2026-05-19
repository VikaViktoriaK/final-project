import {
  MASTERY_BAR_COLOR,
  MASTERY_PERCENT,
} from "../constants/mastery-levels";
import type { MasteryLevel } from "../types";

function getSkillBarFill(mastery: MasteryLevel, draining: boolean) {
  return {
    percent: draining ? 0 : (MASTERY_PERCENT[mastery] ?? 50),
    color: MASTERY_BAR_COLOR[mastery] ?? "var(--color-skill-bar)",
  };
}

export default getSkillBarFill;
