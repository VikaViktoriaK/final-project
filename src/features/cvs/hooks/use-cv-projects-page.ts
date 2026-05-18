"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useCvContext } from "../context/cv-context";
import useActionFeedback from "./shared/use-action-feedback";
import useAnchoredMenu from "./shared/use-anchored-menu";
import useDialog from "./shared/use-dialog";
import useSearch from "./shared/use-search";
import { useCvProjectMutations } from "./use-cv-mutations";
import { projectFormSchema, type ProjectFormValues } from "../schemas";
import filterProjects from "../utils/filter-projects";
import {
  getProjectFormDefaults,
  toProjectMutationInput,
} from "../utils/project-form";
import type { CvProject } from "../types";

type ProjectFormMode = "add" | "update";

function useCvProjectsPage() {
  const { cv, cvId, canEdit } = useCvContext();
  const {
    catalogProjects,
    addCvProject,
    updateCvProject,
    removeCvProject,
    loading: mutating,
  } = useCvProjectMutations(cvId);
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();

  const { query: search, onChange: handleSearchChange } = useSearch();
  const projectMenu = useAnchoredMenu<CvProject>();
  const formDialog = useDialog<ProjectFormMode>();
  const removeDialog = useDialog<CvProject>();

  const [editingProject, setEditingProject] = useState<CvProject | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: getProjectFormDefaults("add"),
  });

  const { reset, control, register, handleSubmit, formState } = form;
  const projectId = useWatch({ control, name: "projectId" });

  const allProjects = useMemo(() => cv?.projects ?? [], [cv?.projects]);
  const projects = useMemo(
    () => filterProjects(allProjects, search),
    [allProjects, search],
  );

  const isSearchEmpty = Boolean(search.trim()) && projects.length === 0;
  const isEmpty = allProjects.length === 0;

  const selectedCatalogProject = catalogProjects.find(
    (project) => project.id === projectId,
  );

  const domainValue =
    selectedCatalogProject?.domain ?? editingProject?.domain ?? "";
  const descriptionValue =
    selectedCatalogProject?.description ?? editingProject?.description ?? "";
  const environmentValue = (
    selectedCatalogProject?.environment ??
    editingProject?.environment ??
    []
  ).join(", ");

  const isUpdateMode = formDialog.payload === "update";
  const editProjectKey = editingProject
    ? `edit-${editingProject.id}`
    : "edit-project";

  const openAddForm = () => {
    setEditingProject(null);
    reset(getProjectFormDefaults("add"));
    formDialog.open("add");
  };

  const openUpdateForm = () => {
    if (!projectMenu.item) {
      return;
    }
    setEditingProject(projectMenu.item);
    reset(getProjectFormDefaults("update", projectMenu.item));
    formDialog.open("update");
    projectMenu.close();
  };

  const openRemoveConfirm = () => {
    if (!projectMenu.item) {
      return;
    }
    removeDialog.open(projectMenu.item);
    projectMenu.close();
  };

  const closeForm = () => {
    formDialog.close();
    setEditingProject(null);
  };

  const submitProjectForm = handleSubmit(async (values) => {
    const input = toProjectMutationInput(values);
    const result =
      formDialog.payload === "update"
        ? await updateCvProject(input)
        : await addCvProject(input);

    if (result.ok) {
      showSuccess(
        formDialog.payload === "update" ? "Project updated" : "Project added",
      );
      closeForm();
      return;
    }
    showError(result.message);
  });

  const confirmRemoveProject = async () => {
    if (!removeDialog.payload) {
      return;
    }
    const result = await removeCvProject(removeDialog.payload.project.id);
    if (result.ok) {
      showSuccess("Project removed");
      removeDialog.close();
      return;
    }
    showError(result.message);
  };

  const formDialogView = {
    open: formDialog.isOpen,
    mode: formDialog.payload ?? "add",
    projects: catalogProjects,
    loading: mutating,
    isUpdateMode,
    domainValue,
    descriptionValue,
    environmentValue,
    control,
    register,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    onClose: closeForm,
    onSubmit: submitProjectForm,
  };

  return {
    cv,
    projects,
    canEdit,
    search,
    mutating,
    isEmpty,
    isSearchEmpty,
    editProjectKey,
    handleSearchChange,
    projectMenu,
    formDialog: formDialogView,
    removeDialog,
    openAddForm,
    openUpdateForm,
    openRemoveConfirm,
    confirmRemoveProject,
    FeedbackSnackbar,
  };
}

export default useCvProjectsPage;
