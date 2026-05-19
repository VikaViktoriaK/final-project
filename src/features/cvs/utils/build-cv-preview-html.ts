import type { Cv } from "../types";
import type { GroupedSkills } from "./group-skills";
import escapeHtml from "./escape-html";
import CV_PREVIEW_EXPORT_CSS from "./cv-preview-export.css";
import {
  buildSkillTableRows,
  formatCvPeriod,
  formatCvPreviewSubtitle,
  formatLanguageLine,
  formatProjectEnvironment,
  formatProjectRoles,
  getCvPreviewDomains,
} from "./cv-preview-format";

function buildSkillsTableHtml(grouped: GroupedSkills[]): string {
  const rows = buildSkillTableRows(grouped);
  if (!rows.length) {
    return "";
  }

  const body = rows
    .map(
      (row) => `
      <tr>
        <td><span class="skill-category">${escapeHtml(row.categoryLabel)}</span> ${escapeHtml(row.skillName)}</td>
        <td class="num">${row.experienceYears}</td>
        <td class="num">${escapeHtml(row.lastUsed)}</td>
      </tr>`,
    )
    .join("");

  return `
    <section class="skills-table-section">
      <h2 class="section-heading">Professional skills</h2>
      <table class="skills-table">
        <thead>
          <tr>
            <th>Skills</th>
            <th>Experience in years</th>
            <th>Last used</th>
          </tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </section>`;
}

function buildTopSkillsHtml(grouped: GroupedSkills[]): string {
  if (!grouped.length) {
    return "";
  }

  return grouped
    .map(
      (group) => `
      <div class="skill-block">
        <h3 class="block-title">${escapeHtml(group.categoryLabel)}</h3>
        ${group.skills
          .map(
            (skill) => `<p class="skill-line">${escapeHtml(skill.name)}.</p>`,
          )
          .join("")}
      </div>`,
    )
    .join("");
}

function buildProjectsHtml(cv: Cv): string {
  if (!cv.projects.length) {
    return "";
  }

  const items = cv.projects
    .map(
      (project) => `
      <article class="project">
        <div class="project-grid">
          <div class="project-left">
            <h3 class="project-name">${escapeHtml(project.name)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
          </div>
          <div class="project-right">
            <div class="meta-block">
              <span class="meta-label">Project roles</span>
              <p class="meta-value">${escapeHtml(formatProjectRoles(project.roles))}</p>
            </div>
            <div class="meta-block">
              <span class="meta-label">Period</span>
              <p class="meta-value">${escapeHtml(formatCvPeriod(project.start_date, project.end_date))}</p>
            </div>
            <div class="meta-block">
              <span class="meta-label">Responsibilities</span>
              <ul>${project.responsibilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
            <div class="meta-block">
              <span class="meta-label">Environment</span>
              <p class="meta-value">${escapeHtml(formatProjectEnvironment(project.environment))}</p>
            </div>
          </div>
        </div>
      </article>`,
    )
    .join("");

  return `
    <section class="projects-section">
      <h2 class="section-heading">Projects</h2>
      ${items}
    </section>`;
}

function buildCvPreviewHtml(cv: Cv, grouped: GroupedSkills[]): string {
  const cvName = escapeHtml(cv.name);
  const education = escapeHtml(cv.education ?? "—");
  const description = escapeHtml(cv.description);
  const domains = escapeHtml(getCvPreviewDomains(cv));
  const subtitle = escapeHtml(formatCvPreviewSubtitle(cv));

  const languagesHtml = cv.languages
    .map(
      (lang) =>
        `<p class="body-text">${escapeHtml(formatLanguageLine(lang.name, lang.proficiency))}</p>`,
    )
    .join("");

  const heroSubtitle = subtitle
    ? `<p class="hero-subtitle">${subtitle}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${cvName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
  <style>${CV_PREVIEW_EXPORT_CSS}</style>
</head>
<body>
  <div class="document">
    <header class="hero">
      <h1 class="hero-name">${cvName}</h1>
      ${heroSubtitle}
    </header>
    <div class="split-grid">
      <div class="sidebar">
        <h3 class="block-title">Education</h3>
        <p class="body-text">${education}</p>
        ${cv.languages.length ? `<h3 class="block-title">Language proficiency</h3>${languagesHtml}` : ""}
        ${domains ? `<h3 class="block-title">Domains</h3><p class="body-text">${domains}</p>` : ""}
      </div>
      <div class="main-col">
        <h3 class="summary-headline">${cvName}</h3>
        <p class="body-text">${description}</p>
        ${buildTopSkillsHtml(grouped)}
      </div>
    </div>
    ${buildSkillsTableHtml(grouped)}
    ${buildProjectsHtml(cv)}
  </div>
</body>
</html>`;
}

export default buildCvPreviewHtml;
