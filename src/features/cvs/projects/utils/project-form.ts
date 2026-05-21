import type { CvProject } from "../../shared/types";
import type {
  ProjectFormValues,
  ProjectMutationInput,
} from "../schemas/project-form.schema";

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
      projectId: initial.project?.id ?? "",
      startDate: toInputDate(initial.start_date),
      endDate: toInputDate(initial.end_date),
      role: initial.roles[0] ?? "Developer",
      responsibilities: initial.responsibilities.join("\n"),
    };
  }

  return {
    projectId: "",
    startDate: "",
    endDate: "",
    role: "Developer",
    responsibilities: "",
  };
}

function parseResponsibilityLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function toProjectMutationInput(
  values: ProjectFormValues,
): ProjectMutationInput {
  const responsibilities = parseResponsibilityLines(values.responsibilities);

  return {
    projectId: values.projectId,
    start_date: values.startDate,
    end_date: values.endDate?.trim() || undefined,
    roles: [values.role.trim()],
    responsibilities,
  };
}

export { getProjectFormDefaults, toInputDate, toProjectMutationInput };
