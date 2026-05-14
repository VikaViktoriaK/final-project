/** Add-language dialog action labels (match UI mock). */
export const ADD_LANGUAGE_DIALOG_LABELS = {
  title: "Add language",
  languageField: "Language",
  proficiencyField: "Language proficiency",
  cancel: "CANCEL",
  confirm: "CONFIRM",
} as const;

export const REMOVE_LANGUAGE_DIALOG_LABELS = {
  title: "Remove language",
  cancel: "CANCEL",
  confirm: "REMOVE",
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
