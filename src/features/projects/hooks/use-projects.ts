import { useQuery } from "@apollo/client/react";
import { PROJECTS_QUERY } from "../graphql/projects.query";
import type { ProjectsQueryData } from "../types";

function useProjects() {
  return useQuery<ProjectsQueryData>(PROJECTS_QUERY);
}

export default useProjects;
