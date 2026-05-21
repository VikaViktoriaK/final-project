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
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { ProjectFormValues } from "../../projects/schemas/project-form.schema";
import type { Project } from "../../shared/types";
import {
  getProjectMaxDate,
  PROJECT_MIN_DATE,
} from "../../projects/utils/project-form-dates";
import { cvsStyles } from "../../styles/cvs.styles";

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
  canSubmit: boolean;
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
  canSubmit,
  onClose,
  onSubmit,
}: ProjectFormDialogProps) {
  const dialogTitle = mode === "add" ? "Add project" : "Update project";
  const submitLabel = mode === "add" ? "Add" : "Update";
  const isPending = isSubmitting || loading;
  const submitEnabled = canSubmit && !isPending;
  const startDate = useWatch({ control, name: "startDate" });
  const maxDate = getProjectMaxDate();
  const endDateMin =
    startDate && startDate >= PROJECT_MIN_DATE ? startDate : PROJECT_MIN_DATE;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={[cvsStyles.dialog, cvsStyles.dialogForm]}
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
                  <Select
                    label="Project"
                    {...field}
                    MenuProps={{
                      slotProps: {
                        paper: { sx: cvsStyles.selectMenuPaper },
                      },
                    }}
                  >
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
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: {
                  min: PROJECT_MIN_DATE,
                  max: maxDate,
                },
              }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              {...register("startDate")}
            />
            <TextField
              label="End Date"
              type="date"
              sx={cvsStyles.formField}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: {
                  min: endDateMin,
                  max: maxDate,
                },
              }}
              error={!!errors.endDate}
              helperText={
                errors.endDate?.message ??
                "Leave empty if the project is ongoing"
              }
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
            placeholder="One responsibility per line"
            error={!!errors.responsibilities}
            helperText={errors.responsibilities?.message}
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
          sx={
            submitEnabled
              ? cvsStyles.primaryButton
              : cvsStyles.primaryButtonMuted
          }
          disabled={!submitEnabled}
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
