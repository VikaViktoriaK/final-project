"use client";

import { Chip } from "@mui/material";
import type { EnvironmentSkillChipProps } from "../types";
import { projectsStyles } from "../styles/projects.styles";

function EnvironmentSkillChip({
  name,
  disabled,
  onRemove,
}: EnvironmentSkillChipProps) {
  const handleDelete = () => {
    onRemove(name);
  };

  return (
    <Chip
      label={name}
      size="small"
      onDelete={disabled ? undefined : handleDelete}
      sx={projectsStyles.environmentChip}
    />
  );
}

export default EnvironmentSkillChip;
