import type { Project } from "./project.model";

type CreateProjectMutationInput = {
  name: string;
  domain: string;
  start_date: string;
  end_date?: string;
  description: string;
  environment: string[];
};

type UpdateProjectMutationInput = CreateProjectMutationInput & {
  projectId: string;
};

type CreateProjectMutationData = {
  createProject: Project;
};

type UpdateProjectMutationData = {
  updateProject: Project;
};

type DeleteProjectMutationData = {
  deleteProject: { affected: number };
};

type ProjectsQueryData = {
  projects: Project[];
};

export type {
  CreateProjectMutationInput,
  UpdateProjectMutationInput,
  CreateProjectMutationData,
  UpdateProjectMutationData,
  DeleteProjectMutationData,
  ProjectsQueryData,
};
