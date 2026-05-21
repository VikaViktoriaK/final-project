"use client";

import { Box, Chip, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import formatDisplayDate from "@/lib/format-display-date";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";
import type { MouseEvent } from "react";
import type { ProjectCardProps } from "../types";

function ProjectCard({ project, canManage, onOpenMenu }: ProjectCardProps) {
  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    onOpenMenu(event, project);
  };

  return (
    <Box sx={cvsStyles.projectCard}>
      <Box sx={cvsStyles.projectsGrid}>
        <Typography sx={[cvsStyles.projectGridCell, cvsStyles.projectTitle]}>
          {project.name}
        </Typography>
        <Typography sx={[cvsStyles.projectGridCell, cvsStyles.projectMeta]}>
          {project.domain}
        </Typography>
        <Typography sx={[cvsStyles.projectGridCell, cvsStyles.projectMeta]}>
          {formatDisplayDate(project.start_date)}
        </Typography>
        <Typography sx={[cvsStyles.projectGridCell, cvsStyles.projectMeta]}>
          {formatDisplayDate(project.end_date)}
        </Typography>
        <Box sx={cvsStyles.projectGridActions}>
          {canManage ? (
            <IconButton
              type="button"
              size="small"
              aria-label="Project actions"
              onClick={handleOpenMenu}
              sx={cvsStyles.menuIconButton}
            >
              <MoreVertIcon />
            </IconButton>
          ) : null}
        </Box>
      </Box>
      <Typography
        sx={[cvsStyles.cvDescription, cvsStyles.cvDescriptionIndented]}
      >
        {project.description}
      </Typography>
      <Box sx={cvsStyles.projectChips}>
        {project.environment.map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            sx={cvsStyles.projectChip}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ProjectCard;
