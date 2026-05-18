import type { CvProject } from "../types";
import type { ProjectFormValues, ProjectMutationInput } from "../schemas";

function toInputDate(value: string | null | undefined): string {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

function getProjectFormDefaults(
  mode: "add" | "update",
  initial?: CvProject | null,
): ProjectFormValues {
  if (mode === "update" && initial) {
    return {
      projectId: initial.project.id,
      startDate: toInputDate(initial.start_date),
      endDate: toInputDate(initial.end_date),
      responsibilities: initial.responsibilities.join("\n"),
    };
  }

  return {
    projectId: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  };
}

function toProjectMutationInput(
  values: ProjectFormValues,
): ProjectMutationInput {
  return {
    projectId: values.projectId,
    start_date: values.startDate,
    end_date: values.endDate || undefined,
    roles: [],
    responsibilities: values.responsibilities
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  };
}

export { getProjectFormDefaults, toInputDate, toProjectMutationInput };
