const CATALOG_PROJECT_LIMITS = {
  name: { maxLength: 120 },
  domain: { maxLength: 120 },
  description: { maxLength: 2000 },
} as const;

const ENVIRONMENT_FIELD_LABEL_ID = "project-environment-label";

const PROJECT_FORM_MODES = ["create", "update"] as const;

export {
  CATALOG_PROJECT_LIMITS,
  ENVIRONMENT_FIELD_LABEL_ID,
  PROJECT_FORM_MODES,
};
