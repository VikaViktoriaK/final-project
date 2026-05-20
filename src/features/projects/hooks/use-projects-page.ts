"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useActionFeedback from "@/hooks/use-action-feedback";
import useAnchoredMenu from "@/hooks/use-anchored-menu";
import useDialog from "@/hooks/use-dialog";
import useSearch from "@/hooks/use-search";
import {
  catalogProjectSchema,
  type CatalogProjectFormValues,
} from "../schemas";
import type {
  CatalogProjectSortField,
  Project,
  ProjectFormMode,
} from "../types";
import { toggleSortDirection, type SortDirection } from "@/lib/sort";
import filterCatalogProjects from "../utils/filter-catalog-projects";
import {
  getCatalogProjectFormDefaults,
  toCreateProjectInput,
  toUpdateProjectInput,
} from "../utils/catalog-project-form";
import { sortCatalogProjects } from "../utils/sort-catalog-projects";
import useProjects from "./use-projects";
import useProjectMutations from "./use-project-mutations";

function useProjectsPage() {
  const { query: search, onChange: handleSearchChange } = useSearch();
  const formDialog = useDialog<ProjectFormMode>();
  const deleteDialog = useDialog<Project>();
  const projectMenu = useAnchoredMenu<Project>();
  const { showSuccess, showError, FeedbackSnackbar } = useActionFeedback();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [sortField, setSortField] = useState<CatalogProjectSortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const { data, loading, error } = useProjects();
  const {
    createProject,
    updateProject,
    deleteProject,
    loading: mutating,
  } = useProjectMutations();

  const form = useForm<CatalogProjectFormValues>({
    resolver: zodResolver(catalogProjectSchema),
    mode: "onChange",
    defaultValues: getCatalogProjectFormDefaults(),
  });

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const allProjects = useMemo(() => data?.projects ?? [], [data?.projects]);
  const filteredProjects = useMemo(
    () => filterCatalogProjects(allProjects, search),
    [allProjects, search],
  );
  const projects = useMemo(
    () => sortCatalogProjects(filteredProjects, sortField, sortDirection),
    [filteredProjects, sortField, sortDirection],
  );

  const isEmpty = allProjects.length === 0;
  const showNoResults =
    Boolean(search.trim()) && projects.length === 0 && allProjects.length > 0;

  const handleSort = (field: CatalogProjectSortField) => {
    if (sortField === field) {
      setSortDirection((previous) => toggleSortDirection(previous));
      return;
    }
    setSortField(field);
    setSortDirection("asc");
  };

  const openCreateDialog = () => {
    setEditingProject(null);
    reset(getCatalogProjectFormDefaults());
    formDialog.open("create");
  };

  const openUpdateDialog = () => {
    if (!projectMenu.item) {
      return;
    }
    setEditingProject(projectMenu.item);
    reset(getCatalogProjectFormDefaults(projectMenu.item));
    formDialog.open("update");
    projectMenu.close();
  };

  const closeFormDialog = () => {
    setEditingProject(null);
    reset(getCatalogProjectFormDefaults());
    formDialog.close();
  };

  const openDeleteDialog = () => {
    if (!projectMenu.item) {
      return;
    }
    deleteDialog.open(projectMenu.item);
    projectMenu.close();
  };

  const submitCatalogProject = async (values: CatalogProjectFormValues) => {
    if (formDialog.payload === "update" && editingProject) {
      const result = await updateProject(
        toUpdateProjectInput(editingProject.id, values),
      );
      if (result.ok) {
        showSuccess("Project updated");
        closeFormDialog();
        return;
      }
      showError(result.message);
      return;
    }

    const result = await createProject(toCreateProjectInput(values));
    if (result.ok) {
      showSuccess("Project created");
      closeFormDialog();
      return;
    }
    showError(result.message);
  };

  const submitForm = handleSubmit(submitCatalogProject);

  const confirmDelete = async () => {
    if (!deleteDialog.payload) {
      return;
    }
    const result = await deleteProject(deleteDialog.payload.id);
    if (result.ok) {
      showSuccess("Project deleted");
      deleteDialog.close();
      return;
    }
    showError(result.message);
  };

  const isFormPending = isSubmitting || mutating;
  const canSubmit = isDirty && isValid && !isFormPending;

  return {
    loading,
    error,
    search,
    handleSearchChange,
    projects,
    isEmpty,
    showNoResults,
    sortField,
    sortDirection,
    handleSort,
    openCreateDialog,
    projectMenu,
    openUpdateDialog,
    openDeleteDialog,
    formDialog: {
      open: formDialog.isOpen,
      mode: formDialog.payload ?? "create",
      control,
      register,
      errors,
      isSubmitting: isFormPending,
      canSubmit,
      onClose: closeFormDialog,
      onSubmit: submitForm,
    },
    deleteDialog: {
      isOpen: deleteDialog.isOpen,
      payload: deleteDialog.payload,
      close: deleteDialog.close,
      confirm: confirmDelete,
      loading: mutating,
    },
    mutating,
    FeedbackSnackbar,
  };
}

export default useProjectsPage;
