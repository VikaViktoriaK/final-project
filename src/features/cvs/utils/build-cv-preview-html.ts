import type { Cv } from "../types";
import type { GroupedSkills } from "./group-skills";
import escapeHtml from "./escape-html";
import {
  buildSkillTableRows,
  formatCvPeriod,
  formatLanguageLine,
  formatProjectEnvironment,
  formatProjectRoles,
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
            <th>Experience (years)</th>
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
            <p><span class="meta-label">Project roles</span><br />${escapeHtml(formatProjectRoles(project.roles))}</p>
            <p><span class="meta-label">Timeframe</span><br />${escapeHtml(formatCvPeriod(project.start_date, project.end_date))}</p>
            <p><span class="meta-label">Responsibilities</span></p>
            <ul>${project.responsibilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            <p><span class="meta-label">Environment</span><br />${escapeHtml(formatProjectEnvironment(project.environment))}</p>
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

  const domains = [
    ...new Set(cv.projects.map((project) => project.domain).filter(Boolean)),
  ]
    .map(escapeHtml)
    .join(", ");

  const languagesHtml = cv.languages
    .map(
      (lang) =>
        `<p class="sidebar-text">${escapeHtml(formatLanguageLine(lang.name, lang.proficiency))}</p>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${cvName}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px;
      font-family: "Roboto", Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #1f1f1f;
      background: #fff;
    }
    .top-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-bottom: 40px;
    }
    .right-col { border-left: 1px solid #c63031; padding-left: 48px; }
    .block-title {
      margin: 0 0 8px;
      font-size: 14px;
      font-weight: 700;
      color: #1f1f1f;
    }
    .sidebar-text, .skill-line, .profile-text {
      margin: 0 0 16px;
      color: #1f1f1f;
    }
    .profile-title {
      margin: 0 0 12px;
      font-size: 14px;
      font-weight: 700;
    }
    .skill-block { margin-bottom: 20px; }
    .skill-line { margin: 0 0 4px; }
    .section-heading {
      margin: 0 0 16px;
      font-size: 22px;
      font-weight: 400;
      color: #1f1f1f;
    }
    .skills-table-section { margin-bottom: 40px; }
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .skills-table thead th {
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #666;
      padding-bottom: 8px;
      border-bottom: 1px solid #c63031;
    }
    .skills-table tbody td {
      padding: 12px 8px 12px 0;
      border-bottom: 1px solid #e8e8e8;
      vertical-align: top;
    }
    .skills-table .num { width: 120px; color: #1f1f1f; }
    .skill-category { color: #c63031; font-weight: 600; }
    .projects-section .project { margin-bottom: 32px; }
    .project-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
    .project-right {
      border-left: 1px solid #c63031;
      padding-left: 48px;
      font-size: 13px;
      color: #666;
    }
    .project-name {
      margin: 0 0 12px;
      font-size: 14px;
      font-weight: 700;
      color: #c63031;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .project-description { margin: 0; color: #1f1f1f; line-height: 1.6; }
    .meta-label { color: #1f1f1f; font-weight: 700; }
    .project-right p { margin: 0 0 12px; }
    .project-right ul {
      margin: 0 0 12px;
      padding-left: 16px;
      color: #666;
    }
    .project-right li { margin-bottom: 4px; }
    .project-right li::marker { color: #c63031; }
  </style>
</head>
<body>
  <div class="top-grid">
    <div class="left-col">
      <h3 class="block-title">Education</h3>
      <p class="sidebar-text">${education}</p>
      ${cv.languages.length ? `<h3 class="block-title">Language proficiency</h3>${languagesHtml}` : ""}
      ${domains ? `<h3 class="block-title">Domains</h3><p class="sidebar-text">${domains}</p>` : ""}
    </div>
    <div class="right-col">
      <h3 class="profile-title">${cvName}</h3>
      <p class="profile-text">${description}</p>
      ${buildTopSkillsHtml(grouped)}
    </div>
  </div>
  ${buildSkillsTableHtml(grouped)}
  ${buildProjectsHtml(cv)}
</body>
</html>`;
}

export default buildCvPreviewHtml;
