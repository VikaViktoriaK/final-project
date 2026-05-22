"use client";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { SkillManagerCatalogSkill } from "../types/skillManager.types";
import SkillSelectField from "./SkillSelectField";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";

type SkillMutationDialogsProps<TMastery extends string> = {
  masteryLevels: readonly TMastery[];
  addDialog: {
    open: boolean;
    skills: SkillManagerCatalogSkill[];
    loading: boolean;
    canSubmit: boolean;
    skillId: string;
    mastery: TMastery;
    onSkillChange: (skillId: string) => void;
    onMasteryChange: (mastery: TMastery) => void;
    onClose: () => void;
    onSubmit: () => void;
  };
  editDialog: {
    open: boolean;
    skillName: string;
    loading: boolean;
    canSubmit: boolean;
    mastery: TMastery;
    onMasteryChange: (mastery: TMastery) => void;
    onClose: () => void;
    onSubmit: () => void;
  };
};

function AddSkillDialog<TMastery extends string>({
  masteryLevels,
  dialog,
}: {
  masteryLevels: readonly TMastery[];
  dialog: SkillMutationDialogsProps<TMastery>["addDialog"];
}) {
  const submitEnabled = dialog.canSubmit && !dialog.loading;

  return (
    <Dialog
      open={dialog.open}
      onClose={dialog.onClose}
      sx={[cvsStyles.dialog, cvsStyles.dialogForm]}
      fullWidth
      maxWidth="md"
      data-testid="add-skill-dialog"
    >
      <DialogTitle sx={cvsStyles.dialogTitle}>
        Add skill
        <IconButton
          type="button"
          onClick={dialog.onClose}
          aria-label="Close"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id="add-skill-form"
          spacing={2.5}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            dialog.onSubmit();
          }}
          sx={cvsStyles.dialogContent}
        >
          <Stack spacing={2}>
            <SkillSelectField
              skills={dialog.skills}
              value={dialog.skillId}
              onChange={dialog.onSkillChange}
            />
            <MasteryField
              value={dialog.mastery}
              levels={masteryLevels}
              onChange={dialog.onMasteryChange}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={[cvsStyles.dialogActions, cvsStyles.skillDialogActions]}
      >
        <Button
          type="button"
          onClick={dialog.onClose}
          sx={cvsStyles.skillDialogCancelButton}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="add-skill-form"
          sx={
            submitEnabled
              ? cvsStyles.skillDialogPrimaryButton
              : cvsStyles.skillDialogPrimaryButtonMuted
          }
          disabled={!submitEnabled}
          data-testid="add-skill-submit"
        >
          {dialog.loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            "Add"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function UpdateSkillDialog<TMastery extends string>({
  masteryLevels,
  dialog,
}: {
  masteryLevels: readonly TMastery[];
  dialog: SkillMutationDialogsProps<TMastery>["editDialog"];
}) {
  const submitEnabled = dialog.canSubmit && !dialog.loading;

  return (
    <Dialog
      open={dialog.open}
      onClose={dialog.onClose}
      sx={[cvsStyles.dialog, cvsStyles.dialogForm]}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={cvsStyles.dialogTitle}>
        Update skill
        <IconButton
          type="button"
          onClick={dialog.onClose}
          aria-label="Close"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id="update-skill-form"
          spacing={2.5}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            dialog.onSubmit();
          }}
          sx={cvsStyles.dialogContent}
        >
          <Stack spacing={2}>
            <TextField
              label="Skill"
              value={dialog.skillName}
              disabled
              fullWidth
              sx={[cvsStyles.formField, cvsStyles.formFieldLocked]}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            <MasteryField
              value={dialog.mastery}
              levels={masteryLevels}
              onChange={dialog.onMasteryChange}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={[cvsStyles.dialogActions, cvsStyles.skillDialogActions]}
      >
        <Button
          type="button"
          onClick={dialog.onClose}
          sx={cvsStyles.skillDialogCancelButton}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="update-skill-form"
          sx={
            submitEnabled
              ? cvsStyles.skillDialogPrimaryButton
              : cvsStyles.skillDialogPrimaryButtonMuted
          }
          disabled={!submitEnabled}
        >
          {dialog.loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            "Update"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function MasteryField<TMastery extends string>({
  value,
  levels,
  onChange,
}: {
  value: TMastery;
  levels: readonly TMastery[];
  onChange: (mastery: TMastery) => void;
}) {
  return (
    <FormControl fullWidth sx={cvsStyles.formField}>
      <InputLabel>Skill mastery</InputLabel>
      <Select
        label="Skill mastery"
        value={value}
        onChange={(event) => onChange(event.target.value as TMastery)}
        data-testid="add-skill-mastery"
        MenuProps={{
          slotProps: {
            paper: { sx: cvsStyles.selectMenuPaper },
          },
        }}
      >
        {levels.map((level) => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </Select>
      {!levels.length ? (
        <FormHelperText>No mastery levels</FormHelperText>
      ) : null}
    </FormControl>
  );
}

function SkillMutationDialogs<TMastery extends string>({
  masteryLevels,
  addDialog,
  editDialog,
}: SkillMutationDialogsProps<TMastery>) {
  return (
    <>
      <AddSkillDialog masteryLevels={masteryLevels} dialog={addDialog} />
      <UpdateSkillDialog masteryLevels={masteryLevels} dialog={editDialog} />
    </>
  );
}

export type { SkillMutationDialogsProps };
export { SkillMutationDialogs };
