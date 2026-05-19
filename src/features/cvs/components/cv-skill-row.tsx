"use client";

import { Box } from "@mui/material";
import type { KeyboardEvent } from "react";
import SkillMasteryBar from "./skill-mastery-bar";
import type { SkillMastery } from "../types";
import { cvsStyles } from "../styles/cvs.styles";

type CvSkillRowProps = {
  skill: SkillMastery;
  removeMode: boolean;
  editable: boolean;
  selected: boolean;
  onToggle: (name: string) => void;
  onEdit: (skill: SkillMastery) => void;
};

function CvSkillRow({
  skill,
  removeMode,
  editable,
  selected,
  onToggle,
  onEdit,
}: CvSkillRowProps) {
  const handleClick = () => {
    if (removeMode) {
      onToggle(skill.name);
      return;
    }
    if (editable) {
      onEdit(skill);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    handleClick();
  };

  const isInteractive = removeMode || editable;

  return (
    <Box
      onClick={handleClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-pressed={removeMode ? selected : undefined}
      aria-label={
        removeMode
          ? `${skill.name}, ${selected ? "selected for removal" : "tap to remove"}`
          : editable
            ? `${skill.name}, tap to edit mastery`
            : undefined
      }
      sx={[
        cvsStyles.skillRow,
        removeMode && cvsStyles.skillRowRemovable,
        removeMode && selected && cvsStyles.skillRowSelected,
        editable && !removeMode && cvsStyles.skillRowEditable,
      ]}
    >
      <SkillMasteryBar
        name={skill.name}
        mastery={skill.mastery}
        draining={removeMode && selected}
        dimmed={removeMode && selected}
      />
    </Box>
  );
}

export default CvSkillRow;
