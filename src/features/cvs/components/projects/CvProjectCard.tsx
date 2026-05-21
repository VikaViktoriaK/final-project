"use client";

import { Box, Chip, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { MouseEvent } from "react";
import formatDisplayDate from "@/lib/format-display-date";
import type { CvProject } from "../../shared/types";
import { cvsStyles } from "../../styles/cvs.styles";

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
          {canEdit ? (
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
        {project.responsibilities.map((item) => (
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

export default CvProjectCard;
