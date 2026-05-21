import { CONFIRM_BULK_REMOVE_SKILLS_LABELS } from "@/features/users/constants/userSkills.constants";
import { bulkRemoveMessage } from "@/features/users/utils/bulkRemoveMessages";
import { ProfileBulkRemoveDialog } from "../ProfileBulkRemoveDialog";
import type { ConfirmBulkRemoveSkillsDialogProps } from "./userSkillDialogs.types";

export function ConfirmBulkRemoveSkillsDialog({
  open,
  selectedCount,
  onClose,
  onConfirm,
  submitting,
  errorMessage,
}: ConfirmBulkRemoveSkillsDialogProps) {
  return (
    <ProfileBulkRemoveDialog
      open={open}
      title={CONFIRM_BULK_REMOVE_SKILLS_LABELS.title}
      cancelLabel={CONFIRM_BULK_REMOVE_SKILLS_LABELS.cancel}
      deleteLabel={CONFIRM_BULK_REMOVE_SKILLS_LABELS.delete}
      message={bulkRemoveMessage(
        selectedCount,
        "Remove this skill from the profile? This cannot be undone.",
        (count) =>
          `Remove ${count} skills from the profile? This cannot be undone.`,
      )}
      submitting={submitting}
      errorMessage={errorMessage}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
