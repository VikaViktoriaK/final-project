import type { Cv } from "../types";
import escapeHtml from "./escape-html";
import formatCvDate from "./format-date";

function buildCvPreviewHtml(cv: Cv): string {
  const displayName = escapeHtml(
    cv.user?.email?.split("@")[0]?.replace(/\./g, " ") ?? "Candidate",
  );
  const cvName = escapeHtml(cv.name);
  const education = escapeHtml(cv.education ?? "—");
  const description = escapeHtml(cv.description);

  const domains = [...new Set(cv.projects.map((p) => p.domain).filter(Boolean))]
    .map(escapeHtml)
    .join(", ");

  const skillsHtml = cv.skills
    .map((s) => `<li>${escapeHtml(s.name)} (${escapeHtml(s.mastery)})</li>`)
    .join("");

  const projectsHtml = cv.projects
    .map(
      (p) => `
      <section>
        <h3>${escapeHtml(p.name)}</h3>
        <p><strong>${escapeHtml(p.domain)}</strong> · ${escapeHtml(formatCvDate(p.start_date))} – ${escapeHtml(formatCvDate(p.end_date))}</p>
        <p>${escapeHtml(p.description)}</p>
        <ul>${p.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
      </section>`,
    )
    .join("");

  const languagesHtml = cv.languages
    .map((l) => `<li>${escapeHtml(l.name)} (${escapeHtml(l.proficiency)})</li>`)
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${cvName}</title>
<style>
  body { font-family: Arial, sans-serif; color: #222; padding: 32px; }
  h1 { margin: 0 0 8px; }
  h2 { margin-top: 24px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
  .muted { color: #666; }
</style>
</head>
<body>
  <h1>${displayName}</h1>
  <p class="muted">${cvName}</p>
  <h2>Education</h2>
  <p>${education}</p>
  <h2>Summary</h2>
  <p>${description}</p>
  ${domains ? `<h2>Domains</h2><p>${domains}</p>` : ""}
  ${languagesHtml ? `<h2>Languages</h2><ul>${languagesHtml}</ul>` : ""}
  ${skillsHtml ? `<h2>Skills</h2><ul>${skillsHtml}</ul>` : ""}
  ${projectsHtml ? `<h2>Projects</h2>${projectsHtml}` : ""}
</body>
</html>`;
}

export default buildCvPreviewHtml;
