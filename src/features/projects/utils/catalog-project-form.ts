import type { CatalogProjectFormValues } from "../schemas";
import type {
  CreateProjectMutationInput,
  Project,
  UpdateProjectMutationInput,
} from "../types";

const EMPTY_CATALOG_PROJECT_VALUES: CatalogProjectFormValues = {
  name: "",
  domain: "",
  startDate: "",
  endDate: "",
  description: "",
  environment: [],
};

function toCreateProjectInput(
  values: CatalogProjectFormValues,
): CreateProjectMutationInput {
  const endDate = values.endDate?.trim();
  return {
    name: values.name.trim(),
    domain: values.domain.trim(),
    start_date: values.startDate,
    end_date: endDate || undefined,
    description: values.description.trim(),
    environment: values.environment,
  };
}

function toUpdateProjectInput(
  projectId: string,
  values: CatalogProjectFormValues,
): UpdateProjectMutationInput {
  return {
    projectId,
    ...toCreateProjectInput(values),
  };
}

function getCatalogProjectFormDefaults(
  project?: Project | null,
): CatalogProjectFormValues {
  if (!project) {
    return { ...EMPTY_CATALOG_PROJECT_VALUES };
  }

  return {
    name: project.name,
    domain: project.domain,
    startDate: project.start_date,
    endDate: project.end_date ?? "",
    description: project.description,
    environment: [...project.environment],
  };
}

export {
  EMPTY_CATALOG_PROJECT_VALUES,
  getCatalogProjectFormDefaults,
  toCreateProjectInput,
  toUpdateProjectInput,
};
