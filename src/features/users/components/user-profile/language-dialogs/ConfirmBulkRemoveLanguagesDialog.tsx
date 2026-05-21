import { CONFIRM_BULK_REMOVE_LANGUAGES_LABELS } from "@/features/users/constants/userLanguages.constants";
import { bulkRemoveMessage } from "@/features/users/utils/bulkRemoveMessages";
import { ProfileBulkRemoveDialog } from "../ProfileBulkRemoveDialog";
import type { ConfirmBulkRemoveLanguagesDialogProps } from "./userLanguageDialogs.types";

export function ConfirmBulkRemoveLanguagesDialog({
  open,
  selectedCount,
  onClose,
  onConfirm,
  submitting,
  errorMessage,
}: ConfirmBulkRemoveLanguagesDialogProps) {
  return (
    <ProfileBulkRemoveDialog
      open={open}
      title={CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.title}
      cancelLabel={CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.cancel}
      deleteLabel={CONFIRM_BULK_REMOVE_LANGUAGES_LABELS.delete}
      message={bulkRemoveMessage(
        selectedCount,
        "Remove this language from the profile? This cannot be undone.",
        (count) =>
          `Remove ${count} languages from the profile? This cannot be undone.`,
      )}
      submitting={submitting}
      errorMessage={errorMessage}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
