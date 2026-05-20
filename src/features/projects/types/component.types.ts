import type { MouseEvent } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import type { Skill } from "@/features/cvs/types";
import type { CatalogProjectFormValues } from "../schemas";
import type { Project } from "./project.model";
import type { ProjectFormMode } from "./hook.types";

type ProjectCardProps = {
  project: Project;
  canManage: boolean;
  onOpenMenu: (event: MouseEvent<HTMLElement>, project: Project) => void;
};

type CatalogProjectFormDialogProps = {
  open: boolean;
  mode: ProjectFormMode;
  control: Control<CatalogProjectFormValues>;
  register: UseFormRegister<CatalogProjectFormValues>;
  errors: FieldErrors<CatalogProjectFormValues>;
  skills: Skill[];
  isSubmitting: boolean;
  canSubmit: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

type EnvironmentFieldContentProps = {
  field: ControllerRenderProps<CatalogProjectFormValues, "environment">;
  skills: Skill[];
  disabled: boolean;
  message?: string;
};

type ProjectEnvironmentFieldProps = {
  control: Control<CatalogProjectFormValues>;
  errors: FieldErrors<CatalogProjectFormValues>;
  skills: Skill[];
  disabled?: boolean;
};

type EnvironmentSkillChipProps = {
  name: string;
  disabled: boolean;
  onRemove: (name: string) => void;
};

export type {
  ProjectCardProps,
  CatalogProjectFormDialogProps,
  EnvironmentFieldContentProps,
  ProjectEnvironmentFieldProps,
  EnvironmentSkillChipProps,
};
