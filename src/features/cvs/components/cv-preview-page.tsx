"use client";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import SkillMasteryBar from "./skill-mastery-bar";
import useCvPreviewPage from "../hooks/use-cv-preview-page";
import formatCvDate from "../utils/format-date";
import { cvsStyles } from "../styles/cvs.styles";

function CvPreviewPage() {
  const page = useCvPreviewPage();

  if (!page.cv) {
    return null;
  }

  return (
    <>
      <Box>
        <Stack direction="row" sx={cvsStyles.previewHeader}>
          <Box>
            <Typography variant="h4" sx={cvsStyles.previewName}>
              {page.displayName}
            </Typography>
            <Typography sx={cvsStyles.previewRole}>{page.cv.name}</Typography>
          </Box>
          <Button
            type="button"
            variant="outlined"
            sx={cvsStyles.exportButton}
            disabled={page.exporting}
            onClick={page.handleExportPdf}
          >
            {page.exporting ? <CircularProgress size={16} /> : "Export PDF"}
          </Button>
        </Stack>

        <Box sx={cvsStyles.previewLayout}>
          <Box>
            <Typography sx={cvsStyles.previewSidebarTitle}>
              Education
            </Typography>
            <Typography sx={cvsStyles.previewSidebarText}>
              {page.cv.education ?? "—"}
            </Typography>

            {page.cv.languages.length > 0 && (
              <>
                <Typography sx={cvsStyles.previewSidebarTitle}>
                  Language proficiency
                </Typography>
                {page.cv.languages.map((lang) => (
                  <Typography key={lang.name} sx={cvsStyles.previewSidebarText}>
                    {lang.name} ({lang.proficiency})
                  </Typography>
                ))}
              </>
            )}

            {page.domains && (
              <>
                <Typography sx={cvsStyles.previewSidebarTitle}>
                  Domains
                </Typography>
                <Typography sx={cvsStyles.previewSidebarText}>
                  {page.domains}
                </Typography>
              </>
            )}
          </Box>

          <Box>
            <Typography sx={cvsStyles.previewSummaryTitle}>
              {page.cv.name}
            </Typography>
            <Typography sx={cvsStyles.previewSummaryBody}>
              {page.cv.description}
            </Typography>

            {page.groupedSkills.map((group) => (
              <Box key={group.categoryLabel} sx={cvsStyles.previewSkillGroup}>
                <Typography sx={cvsStyles.previewSkillGroupTitle}>
                  {group.categoryLabel}
                </Typography>
                {group.skills.map((skill, index) => (
                  <Stack
                    key={skill.name}
                    direction="row"
                    spacing={2}
                    sx={cvsStyles.previewSkillRow}
                  >
                    <SkillMasteryBar
                      name={skill.name}
                      mastery={skill.mastery}
                      index={index}
                    />
                  </Stack>
                ))}
              </Box>
            ))}

            {page.cv.projects.length > 0 && (
              <Box sx={cvsStyles.previewProjectsSection}>
                <Typography variant="h5" sx={cvsStyles.previewProjectsTitle}>
                  Projects
                </Typography>
                {page.cv.projects.map((project) => (
                  <Box key={project.id} sx={cvsStyles.previewProjectItem}>
                    <Typography sx={cvsStyles.previewProjectName}>
                      {project.name}
                    </Typography>
                    <Typography sx={cvsStyles.previewProjectMeta}>
                      {project.domain} · {formatCvDate(project.start_date)} –{" "}
                      {formatCvDate(project.end_date)}
                    </Typography>
                    <Typography sx={cvsStyles.previewProjectDescription}>
                      {project.description}
                    </Typography>
                    <Box
                      component="ul"
                      sx={cvsStyles.previewResponsibilityList}
                    >
                      {project.responsibilities.map((item) => (
                        <Box
                          component="li"
                          key={item}
                          sx={cvsStyles.previewResponsibilityItem}
                        >
                          {item}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvPreviewPage;
