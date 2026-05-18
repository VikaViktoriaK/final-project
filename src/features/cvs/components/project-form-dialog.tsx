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
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { ProjectFormValues } from "../schemas";
import type { Project } from "../types";
import { cvsStyles } from "../styles/cvs.styles";

type ProjectFormDialogProps = {
  open: boolean;
  mode: "add" | "update";
  projects: Project[];
  loading: boolean;
  isUpdateMode: boolean;
  domainValue: string;
  descriptionValue: string;
  environmentValue: string;
  control: Control<ProjectFormValues>;
  register: UseFormRegister<ProjectFormValues>;
  errors: FieldErrors<ProjectFormValues>;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

function ProjectFormDialog({
  open,
  mode,
  projects,
  loading,
  isUpdateMode,
  domainValue,
  descriptionValue,
  environmentValue,
  control,
  register,
  errors,
  isSubmitting,
  onClose,
  onSubmit,
}: ProjectFormDialogProps) {
  const dialogTitle = mode === "add" ? "Add project" : "Update project";
  const submitLabel = mode === "add" ? "Add" : "Update";
  const isPending = isSubmitting || loading;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={cvsStyles.dialog}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={cvsStyles.dialogTitle}>
        {dialogTitle}
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
          id="project-form"
          spacing={2.5}
          noValidate
          onSubmit={onSubmit}
          sx={cvsStyles.dialogContent}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="projectId"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={cvsStyles.formField}
                  disabled={isUpdateMode}
                  error={!!errors.projectId}
                >
                  <InputLabel>Project</InputLabel>
                  <Select label="Project" {...field}>
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.projectId && (
                    <FormHelperText>{errors.projectId.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <TextField
              label="Domain"
              value={domainValue}
              sx={cvsStyles.formField}
              fullWidth
              disabled
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Start Date"
              type="date"
              sx={cvsStyles.formField}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              {...register("startDate")}
            />
            <TextField
              label="End Date"
              type="date"
              sx={cvsStyles.formField}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("endDate")}
            />
          </Stack>
          <TextField
            label="Description"
            value={descriptionValue}
            sx={cvsStyles.formField}
            fullWidth
            multiline
            minRows={3}
            disabled
          />
          <TextField
            label="Environment"
            value={environmentValue}
            sx={cvsStyles.formField}
            fullWidth
            disabled
          />
          <TextField
            label="Responsibilities"
            sx={cvsStyles.formField}
            fullWidth
            multiline
            minRows={4}
            placeholder="One responsibility per line"
            {...register("responsibilities")}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={cvsStyles.dialogActions}>
        <Button type="button" onClick={onClose} sx={cvsStyles.cancelButton}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="project-form"
          sx={cvsStyles.primaryButton}
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            submitLabel
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProjectFormDialog;
