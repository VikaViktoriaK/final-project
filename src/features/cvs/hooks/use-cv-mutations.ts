"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { getAuthUser } from "@/features/auth/lib/auth-storage";
import { CREATE_CV_MUTATION } from "../graphql/create-cv.mutation";
import { UPDATE_CV_MUTATION } from "../graphql/update-cv.mutation";
import { DELETE_CV_MUTATION } from "../graphql/delete-cv.mutation";
import { EXPORT_PDF_MUTATION } from "../graphql/export-pdf.mutation";
import {
  ADD_CV_SKILL_MUTATION,
  DELETE_CV_SKILLS_MUTATION,
  UPDATE_CV_SKILL_MUTATION,
} from "../graphql/cv-skills.mutation";
import {
  ADD_CV_PROJECT_MUTATION,
  REMOVE_CV_PROJECT_MUTATION,
  UPDATE_CV_PROJECT_MUTATION,
} from "../graphql/cv-projects.mutation";
import { CV_QUERY } from "../graphql/cv.query";
import { CVS_QUERY } from "../graphql/cvs.query";
import { SKILL_CATEGORIES_QUERY, SKILLS_QUERY } from "../graphql/skills.query";
import { PROJECTS_QUERY } from "../graphql/projects.query";
import type {
  CreateCvFormValues,
  ProjectMutationInput,
  UpdateCvFormValues,
} from "../schemas";
import type { Cv, MasteryLevel, Project, Skill, SkillCategory } from "../types";
import buildCvPreviewHtml from "../utils/build-cv-preview-html";
import { groupSkillsByCategory } from "../utils/group-skills";
import exportCvPdfClient, {
  exportCvPdfFromElement,
} from "../utils/export-cv-pdf-client";
import {
  downloadPdfPayload,
  isServerPdfUnavailable,
} from "../utils/download-pdf-payload";
import { runMutation, type MutationResult } from "../utils/mutation-result";

function cvRefetch(cvId: string) {
  return [{ query: CV_QUERY, variables: { cvId } }];
}

function useCvSkillCatalog() {
  const { data: categoriesData } = useQuery<{
    skillCategories: SkillCategory[];
  }>(SKILL_CATEGORIES_QUERY);
  const { data: skillsData } = useQuery<{ skills: Skill[] }>(SKILLS_QUERY);

  const allSkills = useMemo(
    () =>
      (skillsData?.skills ?? []).map((skill) => ({
        ...skill,
        id: String(skill.id),
      })),
    [skillsData?.skills],
  );

  return {
    categories: categoriesData?.skillCategories ?? [],
    allSkills,
  };
}

function useCvProjectCatalog() {
  const { data } = useQuery<{ projects: Project[] }>(PROJECTS_QUERY);
  return { catalogProjects: data?.projects ?? [] };
}

function useCvSkillMutations(cvId: string) {
  const refetch = cvRefetch(cvId);

  const [addSkill, { loading: adding }] = useMutation(ADD_CV_SKILL_MUTATION, {
    refetchQueries: refetch,
  });

  const [deleteSkills, { loading: deleting }] = useMutation(
    DELETE_CV_SKILLS_MUTATION,
    { refetchQueries: refetch },
  );

  const [updateSkill, { loading: updating }] = useMutation(
    UPDATE_CV_SKILL_MUTATION,
    { refetchQueries: refetch },
  );

  const addCvSkill = async (input: {
    name: string;
    categoryId?: string;
    mastery: MasteryLevel;
  }): Promise<MutationResult> =>
    runMutation(async () => {
      await addSkill({
        variables: {
          skill: {
            cvId,
            name: input.name,
            categoryId: input.categoryId,
            mastery: input.mastery,
          },
        },
      });
    }, "Failed to add skill");

  const updateCvSkill = async (input: {
    name: string;
    categoryId?: string | null;
    mastery: MasteryLevel;
  }): Promise<MutationResult> =>
    runMutation(async () => {
      await updateSkill({
        variables: {
          skill: {
            cvId,
            name: input.name,
            categoryId: input.categoryId ?? undefined,
            mastery: input.mastery,
          },
        },
      });
    }, "Failed to update skill");

  const removeCvSkills = async (names: string[]): Promise<MutationResult> =>
    runMutation(async () => {
      await deleteSkills({
        variables: { skill: { cvId, name: names } },
      });
    }, "Failed to remove skills");

  return {
    addCvSkill,
    updateCvSkill,
    removeCvSkills,
    loading: adding || updating || deleting,
  };
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

function useCreateCvMutation() {
  const [createCvMutation, { loading }] = useMutation<{ createCv: Cv }>(
    CREATE_CV_MUTATION,
    {
      refetchQueries: [{ query: CVS_QUERY }],
    },
  );

  const createCv = async (
    data: CreateCvFormValues,
  ): Promise<MutationResult<Cv>> =>
    runMutation(async () => {
      const authUser = getAuthUser();
      const result = await createCvMutation({
        variables: {
          cv: {
            name: data.name,
            education: data.education,
            description: data.description,
            ...(authUser ? { userId: authUser.id } : {}),
          },
        },
      });
      const cv = result.data?.createCv;
      if (!cv) {
        throw new Error("CV was not created");
      }
      return cv;
    }, "Failed to create CV");

  return { createCv, loading };
}

function useUpdateCvMutation(cvId: string) {
  const [updateCvMutation, { loading }] = useMutation<{ updateCv: Cv }>(
    UPDATE_CV_MUTATION,
    {
      refetchQueries: [{ query: CVS_QUERY }, ...cvRefetch(cvId)],
    },
  );

  const updateCv = async (
    values: Omit<UpdateCvFormValues, "cvId">,
  ): Promise<MutationResult<Cv>> =>
    runMutation(async () => {
      const result = await updateCvMutation({
        variables: {
          cv: {
            cvId,
            name: values.name.trim(),
            education: values.education.trim(),
            description: values.description.trim(),
          },
        },
      });
      const cv = result.data?.updateCv;
      if (!cv) {
        throw new Error("CV was not updated");
      }
      return cv;
    }, "Failed to update CV");

  return { updateCv, loading };
}

function useDeleteCvMutation() {
  const router = useRouter();
  const [deleteCvMutation, { loading }] = useMutation<{
    deleteCv: { affected: number };
  }>(DELETE_CV_MUTATION, {
    refetchQueries: [{ query: CVS_QUERY }],
  });

  const deleteCv = async (cvId: string): Promise<MutationResult> =>
    runMutation(async () => {
      const result = await deleteCvMutation({
        variables: { cv: { cvId } },
      });
      if (!result.data?.deleteCv?.affected) {
        throw new Error("CV was not deleted");
      }
      router.push("/cvs");
    }, "Failed to delete CV");

  return { deleteCv, loading };
}

function useExportPdfMutation() {
  const { categories } = useCvSkillCatalog();
  const [exportPdfMutation, { loading }] = useMutation<{ exportPdf: string }>(
    EXPORT_PDF_MUTATION,
  );

  const exportPdf = async (
    cv: Cv,
    previewElement?: HTMLElement | null,
  ): Promise<MutationResult> => {
    const grouped = groupSkillsByCategory(cv.skills, categories);
    const html = buildCvPreviewHtml(cv, grouped);
    const fileName = `${cv.name.replace(/\s+/g, "-")}.pdf`;

    const serverResult = await runMutation(async () => {
      const result = await exportPdfMutation({
        variables: { pdf: { html } },
      });
      const payload = result.data?.exportPdf;
      if (!payload) {
        throw new Error("PDF export failed");
      }
      downloadPdfPayload(payload, fileName);
    }, "");

    if (serverResult.ok) {
      return serverResult;
    }

    if (!isServerPdfUnavailable(serverResult.message)) {
      return {
        ok: false,
        message: serverResult.message || "Failed to export PDF",
      };
    }

    if (previewElement) {
      return runMutation(
        () => exportCvPdfFromElement({ element: previewElement, fileName }),
        "Failed to export PDF",
      );
    }

    return runMutation(
      () => exportCvPdfClient({ html, fileName }),
      "Failed to export PDF",
    );
  };

  return { exportPdf, loading };
}

export {
  useCvSkillCatalog,
  useCvSkillMutations,
  useCvProjectMutations,
  useCreateCvMutation,
  useUpdateCvMutation,
  useDeleteCvMutation,
  useExportPdfMutation,
};
