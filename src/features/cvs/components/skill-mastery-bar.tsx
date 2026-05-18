"use client";

import { Box, Typography } from "@mui/material";
import getSkillBarFillStyle from "../utils/get-skill-bar-fill-style";
import { cvsStyles } from "../styles/cvs.styles";
import type { MasteryLevel } from "../types";

type SkillMasteryBarProps = {
  name: string;
  mastery: MasteryLevel;
  index?: number;
};

function SkillMasteryBar({ name, mastery, index = 0 }: SkillMasteryBarProps) {
  return (
    <Box sx={cvsStyles.skillBarGroup}>
      <Box sx={cvsStyles.skillBar}>
        <Box sx={getSkillBarFillStyle(mastery, index)} />
      </Box>
      <Typography sx={cvsStyles.skillName}>{name}</Typography>
    </Box>
  );
}

export default SkillMasteryBar;
