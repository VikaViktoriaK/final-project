import { formDialogSx as sharedFormDialogSx } from "@/shared/styles/formDialog.styles";
import { userProfileLanguagesSx } from "./userProfileLanguages.styles";

/** Profile languages list + shared form dialog chrome (legacy combined export). */
export const userLanguagesSx = {
  ...userProfileLanguagesSx,
  ...sharedFormDialogSx,
} as const;

export { sharedFormDialogSx as formDialogSx, userProfileLanguagesSx };
