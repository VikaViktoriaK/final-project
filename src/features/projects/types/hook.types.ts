import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { SortDirection } from "@/lib/sort";
import type { ProjectGridSortField } from "@/lib/project-grid-sort";
import type { CatalogProjectFormValues } from "../schemas";
import type { Project } from "./project.model";
import { PROJECT_FORM_MODES } from "../constants";

type ProjectFormMode = (typeof PROJECT_FORM_MODES)[number];

type CatalogProjectSortField = ProjectGridSortField;

type ProjectsPageFormDialogState = {
  open: boolean;
  mode: ProjectFormMode;
  control: Control<CatalogProjectFormValues>;
  register: UseFormRegister<CatalogProjectFormValues>;
  errors: FieldErrors<CatalogProjectFormValues>;
  isSubmitting: boolean;
  canSubmit: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

type ProjectsPageDeleteDialogState = {
  isOpen: boolean;
  payload: Project | null;
  close: () => void;
  confirm: () => Promise<void>;
  loading: boolean;
};

export type {
  ProjectFormMode,
  CatalogProjectSortField,
  SortDirection,
  ProjectsPageFormDialogState,
  ProjectsPageDeleteDialogState,
};
