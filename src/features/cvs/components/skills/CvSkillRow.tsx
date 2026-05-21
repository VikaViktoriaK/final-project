"use client";

import type { KeyboardEvent } from "react";
import { UserSkillCard } from "@/features/users/components/user-profile/UserSkillCard";
import type { SkillMastery } from "../../shared/types";

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
  const userSkill = {
    id: skill.name.trim().toLowerCase(),
    name: skill.name,
    categoryId: skill.categoryId ?? "other",
    categoryName: "",
    mastery: skill.mastery,
    progressColor: "",
  };

  return (
    <UserSkillCard
      skill={userSkill}
      disabled={!isInteractive}
      selected={removeMode && selected}
      onClick={handleClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      ariaLabel={
        removeMode
          ? `${skill.name}, ${selected ? "selected for removal" : "tap to remove"}`
          : editable
            ? `${skill.name}, tap to edit mastery`
            : undefined
      }
    />
  );
}

export default CvSkillRow;
