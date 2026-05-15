"use client";

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCvSchema,
  type CreateCvFormValues,
} from "../schemas/create-cv.schema";
import useCreateCv from "../hooks/use-create-cv";
import type { CreateCvDialogProps } from "../types/cv.types";

function CreateCvDialog({ open, onClose }: CreateCvDialogProps) {
  const { createCv, loading, error } = useCreateCv();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCvFormValues>({
    resolver: zodResolver(createCvSchema),
    defaultValues: {
      name: "",
      education: "",
      description: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CreateCvFormValues) => {
    const createdCv = await createCv(data);

    if (createdCv) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create CV</DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          id="create-cv-form"
          spacing={2}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ pt: 1 }}
        >
          <TextField
            label="Name"
            placeholder="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />

          <TextField
            label="Education"
            placeholder="Education"
            {...register("education")}
            error={!!errors.education}
            helperText={errors.education?.message}
            fullWidth
          />

          <TextField
            label="Description"
            placeholder="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            multiline
            minRows={4}
          />

          {error && <Alert severity="error">{error.message}</Alert>}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting || loading}>
          Cancel
        </Button>

        <Button
          type="submit"
          form="create-cv-form"
          variant="contained"
          disabled={isSubmitting || loading}
        >
          {loading ? <CircularProgress size={20} /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCvDialog;
