/** Inline CSS for server-side PDF HTML export (kept in sync with preview document layout). */
const CV_PREVIEW_EXPORT_CSS = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 24px;
    font-family: "Roboto", Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #1f1f1f;
    background: #fff;
  }
  .document {
    width: 852px;
    max-width: 100%;
    margin: 0 auto;
  }
  .hero {
    margin-bottom: 32px;
  }
  .hero-name {
    margin: 0 0 4px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 32px;
    font-weight: 400;
    line-height: 1.2;
    color: #1f1f1f;
  }
  .hero-subtitle {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #666666;
  }
  .split-grid {
    display: grid;
    grid-template-columns: 260px 592px;
    column-gap: 0;
    margin-bottom: 40px;
  }
  .main-col {
    border-left: 1px solid #c63031;
    padding-left: 24px;
    min-height: 100%;
  }
  .block-title {
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 500;
    color: #1f1f1f;
  }
  .body-text {
    margin: 0 0 16px;
    color: #1f1f1f;
    line-height: 1.5;
  }
  .summary-headline {
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: #1f1f1f;
  }
  .skill-block { margin-bottom: 20px; }
  .skill-line { margin: 0 0 4px; color: #1f1f1f; }
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
    font-weight: 500;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #666666;
    padding-bottom: 8px;
    border-bottom: 1px solid #c63031;
  }
  .skills-table tbody td {
    padding: 12px 8px 12px 0;
    border-bottom: 1px solid #e8e8e8;
    vertical-align: top;
  }
  .skills-table .num {
    width: 120px;
    color: #1f1f1f;
    white-space: nowrap;
  }
  .skill-category { color: #c63031; font-weight: 500; }
  .projects-section { margin-top: 8px; }
  .project { margin-bottom: 32px; page-break-inside: avoid; }
  .project-grid {
    display: grid;
    grid-template-columns: 260px 592px;
    column-gap: 0;
  }
  .project-left {
    min-width: 0;
  }
  .project-right {
    border-left: 1px solid #c63031;
    padding-left: 24px;
    font-size: 13px;
  }
  .project-name {
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: #c63031;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }
  .project-description {
    margin: 0;
    color: #1f1f1f;
    line-height: 1.6;
  }
  .meta-block { margin-bottom: 12px; }
  .meta-label {
    display: block;
    margin-bottom: 2px;
    font-size: 13px;
    font-weight: 500;
    color: #1f1f1f;
  }
  .meta-value {
    margin: 0;
    font-size: 13px;
    color: #666666;
    line-height: 1.5;
  }
  .project-right ul {
    margin: 0;
    padding-left: 16px;
    color: #666666;
  }
  .project-right li { margin-bottom: 4px; }
  .project-right li::marker { color: #c63031; }
`;

export default CV_PREVIEW_EXPORT_CSS;
