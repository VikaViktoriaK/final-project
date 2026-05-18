"use client";

import { Box, Checkbox } from "@mui/material";

import SkillMasteryBar from "./skill-mastery-bar";
import type { SkillMastery } from "../types";
import { cvsStyles } from "../styles/cvs.styles";

type CvSkillRowProps = {
  skill: SkillMastery;
  index: number;
  removeMode: boolean;
  checked: boolean;
  onToggle: (name: string) => void;
};

function CvSkillRow({
  skill,
  index,
  removeMode,
  checked,
  onToggle,
}: CvSkillRowProps) {
  const handleToggle = () => {
    onToggle(skill.name);
  };

  return (
    <Box sx={cvsStyles.skillRow}>
      {removeMode && (
        <Checkbox
          checked={checked}
          onChange={handleToggle}
          sx={cvsStyles.skillCheckbox}
        />
      )}
      <SkillMasteryBar
        name={skill.name}
        mastery={skill.mastery}
        index={index}
      />
    </Box>
  );
}

export default CvSkillRow;
