"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {
  ADD_SKILL_DIALOG_LABELS,
  CONFIRM_BULK_REMOVE_SKILLS_LABELS,
  UPDATE_SKILL_DIALOG_LABELS,
} from "@/features/users/constants/userSkills.constants";
import { useAddUserSkillDialog } from "@/features/users/hooks/useAddUserSkillDialog";
import { useUpdateUserSkillDialog } from "@/features/users/hooks/useUpdateUserSkillDialog";
import type {
  ProfileSkillRow,
  UserSkill,
} from "@/features/users/types/userSkills.types";
import { bulkRemoveMessage } from "@/features/users/utils/bulkRemoveMessages";
import { ProfileBulkRemoveDialog } from "./ProfileBulkRemoveDialog";
import { SkillFormDialogFields } from "./SkillFormDialogFields";
import { userLanguagesSx } from "./userLanguages.styles";

const skillDialogPaperSx = [
  userLanguagesSx.languageDialog,
  userLanguagesSx.addLanguageDialog,
] as const;

type AddUserSkillDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  currentSkills: ProfileSkillRow[];
  onCompleted: () => Promise<unknown> | void;
};

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
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {ADD_SKILL_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || !skillName || addable.length === 0}
          sx={userLanguagesSx.dialogConfirmBtn}
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

type UpdateUserSkillDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  skill: UserSkill | null;
  onCompleted: () => Promise<unknown> | void;
};

function UpdateUserSkillDialogContent({
  userId,
  skill,
  onClose,
  onCompleted,
}: {
  userId: string;
  skill: UserSkill;
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
      <DialogActions sx={userLanguagesSx.dialogActions}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={saving}
          sx={userLanguagesSx.dialogCancelBtn}
        >
          {UPDATE_SKILL_DIALOG_LABELS.cancel}
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => void handleSubmit()}
          disabled={saving || mastery === skill.mastery}
          sx={userLanguagesSx.dialogConfirmBtn}
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

type ConfirmBulkRemoveSkillsDialogProps = {
  open: boolean;
  selectedCount: number;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  submitting: boolean;
  errorMessage: string | null;
};

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
