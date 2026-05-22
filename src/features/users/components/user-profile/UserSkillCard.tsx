import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import type { KeyboardEventHandler } from "react";
import {
  masteryToProgressColor,
  masteryToProgressPercent,
} from "@/features/users/constants/userSkills.mastery";
import type { UserSkill } from "@/features/users/types/userSkills.types";
import { profileRemoveModeSx } from "./profileRemoveMode.styles";
import "./user-skills.css";

type UserSkillCardProps = {
  skill: UserSkill;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
};

export function UserSkillCard({
  skill,
  disabled = false,
  selected = false,
  onClick,
  onKeyDown,
  ariaLabel,
}: UserSkillCardProps) {
  const progressValue = masteryToProgressPercent(skill.mastery);
  const progressColor = masteryToProgressColor(progressValue);
  const fillWidth = selected ? 0 : progressValue;

  const skillTestId = `skill-card-${skill.name.trim().toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <ButtonBase
      type="button"
      className={`user-skill-card${selected ? " user-skill-card--selected" : ""}`}
      disabled={disabled}
      focusRipple
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-pressed={selected ? true : undefined}
      aria-valuenow={progressValue}
      aria-label={
        ariaLabel ?? `${skill.name}, ${skill.mastery}, ${progressValue}%`
      }
      data-testid={skillTestId}
      sx={[
        profileRemoveModeSx.chip,
        selected ? profileRemoveModeSx.chipSelected : null,
      ]}
    >
      <Box
        className="user-skill-card__progress"
        aria-hidden
        role="progressbar"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <Box
          component="span"
          className="user-skill-card__progress-fill"
          sx={{
            width: `${fillWidth}%`,
            bgcolor: progressColor,
            minWidth: fillWidth > 0 ? 6 : 0,
          }}
        />
      </Box>
      <Typography component="span" className="user-skill-card__name">
        {skill.name}
      </Typography>
    </ButtonBase>
  );
}
