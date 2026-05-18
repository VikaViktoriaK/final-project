import type { SxProps, Theme } from "@mui/material/styles";
import {
  MASTERY_BAR_COLOR,
  MASTERY_PERCENT,
} from "../constants/mastery-levels";
import { cvsStyles } from "../styles/cvs.styles";
import type { MasteryLevel } from "../types";

function getSkillBarFillStyle(
  mastery: MasteryLevel,
  index = 0,
): SxProps<Theme> {
  const fallbackPalette = [
    "var(--color-primary)",
    "var(--color-mastery-advanced)",
    "var(--color-mastery-proficient)",
    "var(--color-mastery-expert)",
  ] as const;

  return {
    ...cvsStyles.skillBarFill,
    width: `${MASTERY_PERCENT[mastery] ?? 50}%`,
    bgcolor:
      MASTERY_BAR_COLOR[mastery] ??
      fallbackPalette[index % fallbackPalette.length],
  };
}

export default getSkillBarFillStyle;
