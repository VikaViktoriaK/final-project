"use client";

import { Box, Typography } from "@mui/material";
import getSkillBarFill from "../utils/get-skill-bar-style";
import { cvsStyles } from "../styles/cvs.styles";
import type { MasteryLevel } from "../types";

type SkillMasteryBarProps = {
  name: string;
  mastery: MasteryLevel;
  draining?: boolean;
  dimmed?: boolean;
};

function SkillMasteryBar({
  name,
  mastery,
  draining = false,
  dimmed = false,
}: SkillMasteryBarProps) {
  const { percent, color } = getSkillBarFill(mastery, draining);

  return (
    <Box sx={cvsStyles.skillBarGroup}>
      <Box sx={cvsStyles.skillBarTrack} aria-hidden>
        <Box
          sx={{
            ...cvsStyles.skillBarFill,
            width: `${percent}%`,
            bgcolor: color,
          }}
        />
      </Box>
      <Typography
        component="span"
        sx={[cvsStyles.skillName, dimmed && cvsStyles.skillNameDimmed]}
      >
        {name}
      </Typography>
    </Box>
  );
}

export default SkillMasteryBar;
