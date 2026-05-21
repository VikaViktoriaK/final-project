"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { PROJECTS_QUERY } from "@/features/projects/graphql/projects.query";
import { runMutation, type MutationResult } from "@/lib/mutation-result";
import cvRefetch from "../../shared/graphql/cv-refetch";
import type { ProjectMutationInput } from "../schemas/project-form.schema";
import type { Project } from "../../shared/types";
import {
  ADD_CV_PROJECT_MUTATION,
  REMOVE_CV_PROJECT_MUTATION,
  UPDATE_CV_PROJECT_MUTATION,
} from "../graphql/cv-projects.mutation";

function useCvProjectCatalog() {
  const { data } = useQuery<{ projects: Project[] }>(PROJECTS_QUERY);
  return { catalogProjects: data?.projects ?? [] };
}

function useCvProjectMutations(cvId: string) {
  const { catalogProjects } = useCvProjectCatalog();
  const refetch = cvRefetch(cvId);

  const [addProject, { loading: adding }] = useMutation(
    ADD_CV_PROJECT_MUTATION,
    {
      refetchQueries: refetch,
    },
  );
  const [updateProject, { loading: updating }] = useMutation(
    UPDATE_CV_PROJECT_MUTATION,
    { refetchQueries: refetch },
  );
  const [removeProject, { loading: removing }] = useMutation(
    REMOVE_CV_PROJECT_MUTATION,
    { refetchQueries: refetch },
  );

  const addCvProject = async (
    input: ProjectMutationInput,
  ): Promise<MutationResult> =>
    runMutation(async () => {
      await addProject({
        variables: {
          project: {
            cvId,
            ...input,
            roles: input.roles,
            responsibilities: input.responsibilities,
          },
        },
      });
    }, "Failed to add project");

  const updateCvProject = async (
    input: ProjectMutationInput,
  ): Promise<MutationResult> =>
    runMutation(async () => {
      await updateProject({
        variables: {
          project: {
            cvId,
            ...input,
            roles: input.roles,
            responsibilities: input.responsibilities,
          },
        },
      });
    }, "Failed to update project");

  const removeCvProject = async (projectId: string): Promise<MutationResult> =>
    runMutation(async () => {
      await removeProject({
        variables: { project: { cvId, projectId } },
      });
    }, "Failed to remove project");

  return {
    catalogProjects,
    addCvProject,
    updateCvProject,
    removeCvProject,
    loading: adding || updating || removing,
  };
}

export { useCvProjectCatalog, useCvProjectMutations };
