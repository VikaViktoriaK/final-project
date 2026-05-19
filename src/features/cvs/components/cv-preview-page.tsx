"use client";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useCvPreviewPage from "../hooks/use-cv-preview-page";
import {
  buildSkillTableRows,
  formatCvPeriod,
  formatLanguageLine,
  formatProjectEnvironment,
  formatProjectRoles,
} from "../utils/cv-preview-format";
import { cvsStyles } from "../styles/cvs.styles";

function CvPreviewPage() {
  const page = useCvPreviewPage();

  if (!page.cv) {
    return null;
  }

  const skillRows = buildSkillTableRows(page.groupedSkills);

  return (
    <>
      <Stack direction="row" sx={cvsStyles.previewToolbar}>
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

      <Box sx={cvsStyles.previewPaper}>
        <Box sx={cvsStyles.previewTopGrid}>
          <Box>
            <Typography sx={cvsStyles.previewBlockTitle}>Education</Typography>
            <Typography sx={cvsStyles.previewBodyText}>
              {page.cv.education ?? "—"}
            </Typography>

            {page.cv.languages.length > 0 && (
              <>
                <Typography sx={cvsStyles.previewBlockTitle}>
                  Language proficiency
                </Typography>
                {page.cv.languages.map((lang) => (
                  <Typography key={lang.name} sx={cvsStyles.previewBodyText}>
                    {formatLanguageLine(lang.name, lang.proficiency)}
                  </Typography>
                ))}
              </>
            )}

            {page.domains && (
              <>
                <Typography sx={cvsStyles.previewBlockTitle}>
                  Domains
                </Typography>
                <Typography sx={cvsStyles.previewBodyText}>
                  {page.domains}
                </Typography>
              </>
            )}
          </Box>

          <Box sx={cvsStyles.previewRightColumn}>
            <Typography sx={cvsStyles.previewBlockTitle}>
              {page.cv.name}
            </Typography>
            <Typography sx={cvsStyles.previewBodyText}>
              {page.cv.description}
            </Typography>

            {page.groupedSkills.map((group) => (
              <Box key={group.categoryLabel} sx={cvsStyles.previewSkillBlock}>
                <Typography sx={cvsStyles.previewBlockTitle}>
                  {group.categoryLabel}
                </Typography>
                {group.skills.map((skill) => (
                  <Typography key={skill.name} sx={cvsStyles.previewSkillLine}>
                    {skill.name}.
                  </Typography>
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        {skillRows.length > 0 && (
          <Box sx={cvsStyles.previewSkillsTableSection}>
            <Typography sx={cvsStyles.previewSectionHeading}>
              Professional skills
            </Typography>
            <Box sx={cvsStyles.previewTableScroll}>
              <Table sx={cvsStyles.previewSkillsTable}>
                <TableHead>
                  <TableRow>
                    <TableCell>Skills</TableCell>
                    <TableCell className="col-narrow">
                      Experience (years)
                    </TableCell>
                    <TableCell className="col-narrow">Last used</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skillRows.map((row) => (
                    <TableRow key={`${row.categoryLabel}-${row.skillName}`}>
                      <TableCell>
                        <Box
                          component="span"
                          sx={cvsStyles.previewSkillCategory}
                        >
                          {row.categoryLabel}
                        </Box>{" "}
                        {row.skillName}
                      </TableCell>
                      <TableCell className="col-narrow">
                        {row.experienceYears}
                      </TableCell>
                      <TableCell className="col-narrow">
                        {row.lastUsed}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}

        {page.cv.projects.length > 0 && (
          <Box sx={cvsStyles.previewProjectsSection}>
            <Typography sx={cvsStyles.previewSectionHeading}>
              Projects
            </Typography>
            {page.cv.projects.map((project) => (
              <Box key={project.id} sx={cvsStyles.previewProjectBlock}>
                <Box sx={cvsStyles.previewProjectGrid}>
                  <Box>
                    <Typography sx={cvsStyles.previewProjectName}>
                      {project.name}
                    </Typography>
                    <Typography sx={cvsStyles.previewProjectDescription}>
                      {project.description}
                    </Typography>
                  </Box>
                  <Box sx={cvsStyles.previewProjectRight}>
                    <Box sx={cvsStyles.previewMetaBlock}>
                      <Typography
                        component="span"
                        sx={cvsStyles.previewMetaLabel}
                      >
                        Project roles
                      </Typography>
                      <Typography sx={cvsStyles.previewMetaValue}>
                        {formatProjectRoles(project.roles)}
                      </Typography>
                    </Box>
                    <Box sx={cvsStyles.previewMetaBlock}>
                      <Typography
                        component="span"
                        sx={cvsStyles.previewMetaLabel}
                      >
                        Timeframe
                      </Typography>
                      <Typography sx={cvsStyles.previewMetaValue}>
                        {formatCvPeriod(project.start_date, project.end_date)}
                      </Typography>
                    </Box>
                    <Box sx={cvsStyles.previewMetaBlock}>
                      <Typography
                        component="span"
                        sx={cvsStyles.previewMetaLabel}
                      >
                        Responsibilities
                      </Typography>
                      <Box
                        component="ul"
                        sx={cvsStyles.previewResponsibilityList}
                      >
                        {project.responsibilities.map((item) => (
                          <Box component="li" key={item}>
                            {item}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={cvsStyles.previewMetaBlock}>
                      <Typography
                        component="span"
                        sx={cvsStyles.previewMetaLabel}
                      >
                        Environment
                      </Typography>
                      <Typography sx={cvsStyles.previewMetaValue}>
                        {formatProjectEnvironment(project.environment)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {page.FeedbackSnackbar}
    </>
  );
}

export default CvPreviewPage;
