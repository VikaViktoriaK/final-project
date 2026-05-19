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
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { MASTERY_LEVELS } from "../constants/mastery-levels";
import type { AddSkillFormValues, UpdateSkillFormValues } from "../schemas";
import type { Skill } from "../types";
import SkillSelectField from "./skill-select-field";
import { cvsStyles } from "../styles/cvs.styles";

type AddSkillDialogProps = {
  open: boolean;
  skills: Skill[];
  loading: boolean;
  canSubmit: boolean;
  control: Control<AddSkillFormValues>;
  errors: FieldErrors<AddSkillFormValues>;
  onClose: () => void;
  onSubmit: () => void;
};

function AddSkillDialog({
  open,
  skills,
  loading,
  canSubmit,
  control,
  errors,
  onClose,
  onSubmit,
}: AddSkillDialogProps) {
  const submitEnabled = canSubmit && !loading;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={[cvsStyles.dialog, cvsStyles.dialogForm]}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={cvsStyles.dialogTitle}>
        Add skill
        <IconButton
          type="button"
          onClick={onClose}
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
          onSubmit={onSubmit}
          sx={cvsStyles.dialogContent}
        >
          <Stack spacing={2}>
            <Controller
              name="skillId"
              control={control}
              render={({ field }) => (
                <SkillSelectField
                  skills={skills}
                  value={field.value ? String(field.value) : ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  inputRef={field.ref}
                  error={!!errors.skillId}
                  helperText={errors.skillId?.message}
                />
              )}
            />
            <Controller
              name="mastery"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={cvsStyles.formField}
                  error={!!errors.mastery}
                >
                  <InputLabel>Skill mastery</InputLabel>
                  <Select
                    label="Skill mastery"
                    {...field}
                    MenuProps={{
                      slotProps: {
                        paper: { sx: cvsStyles.selectMenuPaper },
                      },
                    }}
                  >
                    {MASTERY_LEVELS.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.mastery && (
                    <FormHelperText>{errors.mastery.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={cvsStyles.dialogActions}>
        <Button type="button" onClick={onClose} sx={cvsStyles.cancelButton}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="add-skill-form"
          sx={
            submitEnabled
              ? cvsStyles.primaryButton
              : cvsStyles.primaryButtonMuted
          }
          disabled={!submitEnabled}
        >
          {loading ? <CircularProgress size={18} color="inherit" /> : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type UpdateSkillDialogProps = {
  open: boolean;
  skillName: string;
  loading: boolean;
  canSubmit: boolean;
  control: Control<UpdateSkillFormValues>;
  errors: FieldErrors<UpdateSkillFormValues>;
  onClose: () => void;
  onSubmit: () => void;
};

function UpdateSkillDialog({
  open,
  skillName,
  loading,
  canSubmit,
  control,
  errors,
  onClose,
  onSubmit,
}: UpdateSkillDialogProps) {
  const submitEnabled = canSubmit && !loading;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={[cvsStyles.dialog, cvsStyles.dialogForm]}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={cvsStyles.dialogTitle}>
        Update skill
        <IconButton
          type="button"
          onClick={onClose}
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
          onSubmit={onSubmit}
          sx={cvsStyles.dialogContent}
        >
          <Stack spacing={2}>
            <TextField
              label="Skill"
              value={skillName}
              disabled
              fullWidth
              sx={[cvsStyles.formField, cvsStyles.formFieldLocked]}
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
            <Controller
              name="mastery"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={cvsStyles.formField}
                  error={!!errors.mastery}
                >
                  <InputLabel>Skill mastery</InputLabel>
                  <Select
                    label="Skill mastery"
                    {...field}
                    MenuProps={{
                      slotProps: {
                        paper: { sx: cvsStyles.selectMenuPaper },
                      },
                    }}
                  >
                    {MASTERY_LEVELS.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.mastery && (
                    <FormHelperText>{errors.mastery.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={cvsStyles.dialogActions}>
        <Button type="button" onClick={onClose} sx={cvsStyles.cancelButton}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="update-skill-form"
          sx={
            submitEnabled
              ? cvsStyles.primaryButton
              : cvsStyles.primaryButtonMuted
          }
          disabled={!submitEnabled}
        >
          {loading ? <CircularProgress size={18} color="inherit" /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { AddSkillDialog, UpdateSkillDialog };
