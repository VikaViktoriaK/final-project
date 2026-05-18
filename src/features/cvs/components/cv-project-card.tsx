"use client";

import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { MouseEvent } from "react";
import formatCvDate from "../utils/format-date";
import type { CvProject } from "../types";
import { cvsStyles } from "../styles/cvs.styles";

type CvProjectCardProps = {
  project: CvProject;
  canEdit: boolean;
  onOpenMenu: (event: MouseEvent<HTMLElement>, project: CvProject) => void;
};

function CvProjectCard({ project, canEdit, onOpenMenu }: CvProjectCardProps) {
  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    onOpenMenu(event, project);
  };

  return (
    <Box sx={cvsStyles.projectCard}>
      <Stack direction="row" spacing={2} sx={cvsStyles.projectRow}>
        <Typography sx={cvsStyles.projectTitle}>{project.name}</Typography>
        <Typography sx={cvsStyles.projectHeaderDomain}>
          {project.domain}
        </Typography>
        <Typography sx={cvsStyles.projectHeaderDate}>
          {formatCvDate(project.start_date)}
        </Typography>
        <Typography sx={cvsStyles.projectHeaderDate}>
          {formatCvDate(project.end_date)}
        </Typography>
        {canEdit && (
          <IconButton
            type="button"
            size="small"
            aria-label="Project actions"
            onClick={handleOpenMenu}
            sx={cvsStyles.menuIconButton}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </Stack>
      <Typography
        sx={[cvsStyles.cvDescription, cvsStyles.cvDescriptionIndented]}
      >
        {project.description}
      </Typography>
      <Stack direction="row" spacing={1} sx={cvsStyles.projectChips}>
        {project.responsibilities.map((item) => (
          <Chip
            key={item}
            label={item}
            size="small"
            sx={cvsStyles.projectChip}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default CvProjectCard;
