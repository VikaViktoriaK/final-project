/** Add-language dialog action labels (match UI mock). */
export const ADD_LANGUAGE_DIALOG_LABELS = {
  title: "Add language",
  languageField: "Language",
  proficiencyField: "Proficiency",
  cancel: "CANCEL",
  confirm: "CONFIRM",
} as const;

/** Bulk-delete confirmation (after selecting rows on the languages page). */
export const CONFIRM_BULK_REMOVE_LANGUAGES_LABELS = {
  title: "Delete languages",
  cancel: "CANCEL",
  delete: "DELETE",
} as const;

export const UPDATE_LANGUAGE_DIALOG_LABELS = {
  title: "Update language",
  languageField: "Language",
  proficiencyField: "Proficiency",
  cancel: "CANCEL",
  confirm: "CONFIRM",
} as const;

/** CEFR-style + Native for new profile language rows. */
export const LANGUAGE_PROFICIENCY_OPTIONS = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Native",
] as const;
