import type { CvProject } from "../../shared/types";

function filterProjects(projects: CvProject[], search: string): CvProject[] {
  const query = search.trim().toLowerCase();
  if (!query) {
    return projects;
  }

  return projects.filter(
    (project) =>
      project.name.toLowerCase().includes(query) ||
      project.domain.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query),
  );
}

export default filterProjects;
