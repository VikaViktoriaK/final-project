"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useCvContext } from "../../shared/context/cv-context";
import useActionFeedback from "@/hooks/use-action-feedback";
import useAnchoredMenu from "@/hooks/use-anchored-menu";
import useDialog from "@/hooks/use-dialog";
import useSearch from "@/hooks/use-search";
import { useCvProjectMutations } from "./use-cv-project-mutations";
import {
  projectFormSchema,
  type ProjectFormValues,
} from "../schemas/project-form.schema";
import filterProjects from "../utils/filter-projects";
import { sortProjects, type ProjectSortField } from "../utils/sort-projects";
import type { SortDirection } from "../../list/utils/cv-list";
import {
  getProjectFormDefaults,
  toProjectMutationInput,
} from "../utils/project-form";
import type { CvProject } from "../../shared/types";

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
  const [sortField, setSortField] = useState<ProjectSortField>("domain");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
    defaultValues: getProjectFormDefaults("add"),
  });

  const { reset, control, register, handleSubmit, formState } = form;
  const projectId = useWatch({ control, name: "projectId" });

  const allProjects = useMemo(() => cv?.projects ?? [], [cv?.projects]);
  const filteredProjects = useMemo(
    () => filterProjects(allProjects, search),
    [allProjects, search],
  );

  const projects = useMemo(
    () => sortProjects(filteredProjects, sortField, sortDirection),
    [filteredProjects, sortField, sortDirection],
  );

  const isSearchEmpty = Boolean(search.trim()) && filteredProjects.length === 0;
  const isEmpty = allProjects.length === 0;
  const showNoResults = isEmpty || isSearchEmpty;

  const handleSort = (field: ProjectSortField) => {
    if (sortField === field) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortDirection("asc");
  };

  const assignedProjectIds = useMemo(
    () =>
      new Set(
        (cv?.projects ?? [])
          .map((item) => item.project?.id)
          .filter((id): id is string => Boolean(id)),
      ),
    [cv?.projects],
  );

  const projectsForAdd = useMemo(
    () =>
      catalogProjects.filter((project) => !assignedProjectIds.has(project.id)),
    [catalogProjects, assignedProjectIds],
  );

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
    const projectId = removeDialog.payload.project?.id;
    if (!projectId) {
      showError("Project reference is missing");
      return;
    }
    const result = await removeCvProject(projectId);
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
    projects:
      formDialog.payload === "update" ? catalogProjects : projectsForAdd,
    loading: mutating,
    isUpdateMode,
    domainValue,
    descriptionValue,
    environmentValue,
    control,
    register,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    canSubmit: formState.isValid,
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
    showNoResults,
    sortField,
    sortDirection,
    handleSort,
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
