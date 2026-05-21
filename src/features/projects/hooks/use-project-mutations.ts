"use client";

import { useMutation } from "@apollo/client/react";
import { PROJECTS_QUERY } from "../graphql/projects.query";
import {
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION,
} from "../graphql/projects.mutation";
import type {
  CreateProjectMutationData,
  CreateProjectMutationInput,
  DeleteProjectMutationData,
  UpdateProjectMutationData,
  UpdateProjectMutationInput,
} from "../types";
import { runMutation, type MutationResult } from "@/lib/mutation-result";

const projectsRefetch = [{ query: PROJECTS_QUERY }];

function useProjectMutations() {
  const [createProjectMutation, { loading: creating }] =
    useMutation<CreateProjectMutationData>(CREATE_PROJECT_MUTATION, {
      refetchQueries: projectsRefetch,
    });

  const [updateProjectMutation, { loading: updating }] =
    useMutation<UpdateProjectMutationData>(UPDATE_PROJECT_MUTATION, {
      refetchQueries: projectsRefetch,
    });

  const [deleteProjectMutation, { loading: deleting }] =
    useMutation<DeleteProjectMutationData>(DELETE_PROJECT_MUTATION, {
      refetchQueries: projectsRefetch,
    });

  const createProject = async (
    input: CreateProjectMutationInput,
  ): Promise<MutationResult<CreateProjectMutationData["createProject"]>> =>
    runMutation(async () => {
      const result = await createProjectMutation({
        variables: { project: input },
      });
      const project = result.data?.createProject;
      if (!project) {
        throw new Error("Project was not created");
      }
      return project;
    }, "Failed to create project");

  const updateProject = async (
    input: UpdateProjectMutationInput,
  ): Promise<MutationResult<UpdateProjectMutationData["updateProject"]>> =>
    runMutation(async () => {
      const result = await updateProjectMutation({
        variables: { project: input },
      });
      const project = result.data?.updateProject;
      if (!project) {
        throw new Error("Project was not updated");
      }
      return project;
    }, "Failed to update project");

  const deleteProject = async (projectId: string): Promise<MutationResult> =>
    runMutation(async () => {
      await deleteProjectMutation({
        variables: { project: { projectId } },
      });
    }, "Failed to delete project");

  return {
    createProject,
    updateProject,
    deleteProject,
    loading: creating || updating || deleting,
  };
}

export default useProjectMutations;
