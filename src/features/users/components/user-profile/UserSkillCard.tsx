import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import {
  masteryToProgressColor,
  masteryToProgressPercent,
} from "@/features/users/constants/userSkills.mastery";
import type { UserSkill } from "@/features/users/types/userSkills.types";
import { profileSelectionSx } from "./profileSelection.styles";
import "./user-skills.css";

type UserSkillCardProps = {
  skill: UserSkill;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export function UserSkillCard({
  skill,
  disabled = false,
  selected = false,
  onClick,
}: UserSkillCardProps) {
  const progressValue = masteryToProgressPercent(skill.mastery);
  const progressColor = masteryToProgressColor(progressValue);

  return (
    <ButtonBase
      type="button"
      className="user-skill-card"
      disabled={disabled}
      focusRipple
      onClick={onClick}
      aria-pressed={selected ? true : undefined}
      aria-valuenow={progressValue}
      aria-label={`${skill.name}, ${skill.mastery}, ${progressValue}%`}
      sx={[
        profileSelectionSx.chip,
        selected ? profileSelectionSx.chipSelected : null,
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
            width: `${progressValue}%`,
            bgcolor: progressColor,
            minWidth: progressValue > 0 ? 4 : 0,
          }}
        />
      </Box>
      <Typography component="span" className="user-skill-card__name">
        {skill.name}
      </Typography>
    </ButtonBase>
  );
}
