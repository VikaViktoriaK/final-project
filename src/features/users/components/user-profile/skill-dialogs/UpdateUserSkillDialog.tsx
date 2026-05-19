import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { UPDATE_SKILL_DIALOG_LABELS } from "@/features/users/constants/userSkills.constants";
import { useUpdateUserSkillDialog } from "@/features/users/hooks/useUpdateUserSkillDialog";
import { formDialogSx } from "@/shared/styles/formDialog.styles";
import { SkillFormDialogFields } from "../SkillFormDialogFields";
import { skillDialogPaperSx } from "./skillDialog.styles";
import type { UpdateUserSkillDialogProps } from "./userSkillDialogs.types";

function UpdateUserSkillDialogContent({
  userId,
  skill,
  onClose,
  onCompleted,
}: {
  userId: string;
  skill: NonNullable<UpdateUserSkillDialogProps["skill"]>;
  onClose: () => void;
  onCompleted: () => Promise<unknown> | void;
}) {
  const {
    mastery,
    setMastery,
    submitError,
    masteryCatalog,
    saving,
    handleSubmit,
  } = useUpdateUserSkillDialog({
    userId,
    skill,
    onClose,
    onCompleted,
  });

  return (
    <>
      <SkillFormDialogFields
        title={UPDATE_SKILL_DIALOG_LABELS.title}
        skillLabel={UPDATE_SKILL_DIALOG_LABELS.skillField}
        masteryLabel={UPDATE_SKILL_DIALOG_LABELS.masteryField}
        skillName={skill.name}
        onSkillNameChange={() => undefined}
        skillOptions={[{ id: skill.id, name: skill.name }]}
        skillSelectDisabled
        mastery={mastery}
        onMasteryChange={setMastery}
        masteryCatalog={masteryCatalog}
        loading={false}
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
          {UPDATE_SKILL_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || mastery === skill.mastery}
          sx={formDialogSx.dialogConfirmBtn}
        >
          {UPDATE_SKILL_DIALOG_LABELS.confirm}
        </Button>
      </DialogActions>
    </>
  );
}

export function UpdateUserSkillDialog({
  open,
  onClose,
  userId,
  skill,
  onCompleted,
}: UpdateUserSkillDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={skillDialogPaperSx}
    >
      {open && skill ? (
        <UpdateUserSkillDialogContent
          key={`${skill.name}:${skill.mastery}`}
          userId={userId}
          skill={skill}
          onClose={onClose}
          onCompleted={onCompleted}
        />
      ) : null}
    </Dialog>
  );
}
