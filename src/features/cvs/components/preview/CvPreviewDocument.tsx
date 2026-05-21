"use client";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { Ref } from "react";
import type { Cv } from "../../shared/types";
import type { GroupedSkills } from "../../shared/utils/group-skills";
import {
  buildSkillTableRows,
  formatCvPeriod,
  formatCvPreviewSubtitle,
  formatLanguageLine,
  formatProjectEnvironment,
  formatProjectRoles,
  getCvPreviewDomains,
} from "../../preview/utils/cv-preview-format";
import { cvsStyles } from "../../styles/cvs.styles";

type CvPreviewDocumentProps = {
  cv: Cv;
  groupedSkills: GroupedSkills[];
  documentRef?: Ref<HTMLDivElement>;
};

function CvPreviewDocument({
  cv,
  groupedSkills,
  documentRef,
}: CvPreviewDocumentProps) {
  const skillRows = buildSkillTableRows(groupedSkills);
  const domains = getCvPreviewDomains(cv);
  const subtitle = formatCvPreviewSubtitle(cv);

  return (
    <Box
      ref={documentRef}
      sx={[cvsStyles.previewPaper, cvsStyles.previewDocument]}
    >
      <Box sx={cvsStyles.previewHero}>
        <Typography component="h1" sx={cvsStyles.previewHeroName}>
          {cv.name}
        </Typography>
        {subtitle ? (
          <Typography component="p" sx={cvsStyles.previewHeroSubtitle}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>

      <Box sx={cvsStyles.previewSplitGrid}>
        <Box sx={cvsStyles.previewSidebar}>
          <Typography sx={cvsStyles.previewBlockTitle}>Education</Typography>
          <Typography sx={cvsStyles.previewBodyText}>
            {cv.education ?? "—"}
          </Typography>

          {cv.languages.length > 0 && (
            <>
              <Typography sx={cvsStyles.previewBlockTitle}>
                Language proficiency
              </Typography>
              {cv.languages.map((lang) => (
                <Typography key={lang.name} sx={cvsStyles.previewBodyText}>
                  {formatLanguageLine(lang.name, lang.proficiency)}
                </Typography>
              ))}
            </>
          )}

          {domains ? (
            <>
              <Typography sx={cvsStyles.previewBlockTitle}>Domains</Typography>
              <Typography sx={cvsStyles.previewBodyText}>{domains}</Typography>
            </>
          ) : null}
        </Box>

        <Box sx={cvsStyles.previewMainColumn}>
          <Typography sx={cvsStyles.previewSummaryHeadline}>
            {cv.name}
          </Typography>
          <Typography sx={cvsStyles.previewBodyText}>
            {cv.description}
          </Typography>

          {groupedSkills.map((group) => (
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
                    Experience in years
                  </TableCell>
                  <TableCell className="col-narrow">Last used</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {skillRows.map((row) => (
                  <TableRow key={`${row.categoryLabel}-${row.skillName}`}>
                    <TableCell>
                      <Box component="span" sx={cvsStyles.previewSkillCategory}>
                        {row.categoryLabel}
                      </Box>{" "}
                      {row.skillName}
                    </TableCell>
                    <TableCell className="col-narrow">
                      {row.experienceYears}
                    </TableCell>
                    <TableCell className="col-narrow">{row.lastUsed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}

      {cv.projects.length > 0 && (
        <Box sx={cvsStyles.previewProjectsSection}>
          <Typography sx={cvsStyles.previewSectionHeading}>Projects</Typography>
          {cv.projects.map((project) => (
            <Box key={project.id} sx={cvsStyles.previewProjectBlock}>
              <Box sx={cvsStyles.previewProjectGrid}>
                <Box sx={cvsStyles.previewProjectSidebar}>
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
                      Period
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
  );
}

export default CvPreviewDocument;
