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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { MASTERY_LEVELS } from "../constants/mastery-levels";
import type { AddSkillFormValues } from "../schemas";
import type { Skill } from "../types";
import { cvsStyles } from "../styles/cvs.styles";

type AddSkillDialogProps = {
  open: boolean;
  skills: Skill[];
  loading: boolean;
  control: Control<AddSkillFormValues>;
  errors: FieldErrors<AddSkillFormValues>;
  onClose: () => void;
  onSubmit: () => void;
};

function AddSkillDialog({
  open,
  skills,
  loading,
  control,
  errors,
  onClose,
  onSubmit,
}: AddSkillDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={cvsStyles.dialog}
      fullWidth
      maxWidth="sm"
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
          <Controller
            name="skillId"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={cvsStyles.formField}
                error={!!errors.skillId}
              >
                <InputLabel>Skill</InputLabel>
                <Select label="Skill" {...field}>
                  {skills.map((skill) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.skillId && (
                  <FormHelperText>{errors.skillId.message}</FormHelperText>
                )}
              </FormControl>
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
                <InputLabel>Mastery</InputLabel>
                <Select label="Mastery" {...field}>
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
      </DialogContent>
      <DialogActions sx={cvsStyles.dialogActions}>
        <Button type="button" onClick={onClose} sx={cvsStyles.cancelButton}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="add-skill-form"
          sx={cvsStyles.primaryButton}
          disabled={loading}
        >
          {loading ? <CircularProgress size={18} color="inherit" /> : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSkillDialog;
