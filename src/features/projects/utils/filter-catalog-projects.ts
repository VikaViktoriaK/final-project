import type { Project } from "../types";

function filterCatalogProjects(projects: Project[], search: string): Project[] {
  const query = search.trim().toLowerCase();
  if (!query) {
    return projects;
  }

  return projects.filter(
    (project) =>
      project.name.toLowerCase().includes(query) ||
      project.domain.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.environment.some((item) => item.toLowerCase().includes(query)),
  );
}

export default filterCatalogProjects;
