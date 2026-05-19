import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { ADD_SKILL_DIALOG_LABELS } from "@/features/users/constants/userSkills.constants";
import { useAddUserSkillDialog } from "@/features/users/hooks/useAddUserSkillDialog";
import { formDialogSx } from "@/shared/styles/formDialog.styles";
import { SkillFormDialogFields } from "../SkillFormDialogFields";
import { skillDialogPaperSx } from "./skillDialog.styles";
import type { AddUserSkillDialogProps } from "./userSkillDialogs.types";

function AddUserSkillDialogContent({
  userId,
  currentSkills,
  onClose,
  onCompleted,
}: Omit<AddUserSkillDialogProps, "open">) {
  const {
    skillName,
    setSkillName,
    mastery,
    setMastery,
    submitError,
    skillsLoading,
    addable,
    masteryCatalog,
    saving,
    handleSubmit,
  } = useAddUserSkillDialog({
    userId,
    currentSkills,
    onClose,
    onCompleted,
  });

  return (
    <>
      <SkillFormDialogFields
        title={ADD_SKILL_DIALOG_LABELS.title}
        skillLabel={ADD_SKILL_DIALOG_LABELS.skillField}
        masteryLabel={ADD_SKILL_DIALOG_LABELS.masteryField}
        skillName={skillName}
        onSkillNameChange={setSkillName}
        skillOptions={addable.map((item) => ({
          id: item.id,
          name: item.name,
        }))}
        mastery={mastery}
        onMasteryChange={setMastery}
        masteryCatalog={masteryCatalog}
        loading={skillsLoading}
        emptySkillsMessage={
          !skillsLoading && addable.length === 0
            ? "No skills available to add, or the list is empty."
            : null
        }
        submitError={submitError}
        onClose={onClose}
      />
      <DialogActions sx={formDialogSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={formDialogSx.dialogCancelBtn}
        >
          {ADD_SKILL_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || !skillName || addable.length === 0}
          sx={formDialogSx.dialogConfirmBtn}
        >
          {ADD_SKILL_DIALOG_LABELS.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function AddUserSkillDialog({
  open,
  onClose,
  userId,
  currentSkills,
  onCompleted,
}: AddUserSkillDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={skillDialogPaperSx}
    >
      {open ? (
        <AddUserSkillDialogContent
          key={userId}
          userId={userId}
          currentSkills={currentSkills}
          onClose={onClose}
          onCompleted={onCompleted}
        />
      ) : null}
    </Dialog>
  );
}
