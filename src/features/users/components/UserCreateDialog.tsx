"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateUserMutation } from "../api/createUser";
import { useUserEditOptionsQuery } from "../api/updateUser";
import {
  createUserSchema,
  type CreateUserFieldErrors,
} from "../schemas/createUser.schema";
import {
  DEFAULT_USER_CREATE_FORM,
  type UserCreateFormState,
} from "../types/userCreate.types";
import { usersTableSx } from "./usersTable.styles";

type UserCreateDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export function UserCreateDialog({
  open,
  onClose,
  onCreated,
}: UserCreateDialogProps) {
  const [form, setForm] = React.useState<UserCreateFormState>(
    DEFAULT_USER_CREATE_FORM,
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<CreateUserFieldErrors>(
    {},
  );
  const [createUser, { loading, error }] = useCreateUserMutation();
  const { data: optionsData, loading: loadingOptions } =
    useUserEditOptionsQuery();

  const handleField =
    (key: keyof UserCreateFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (
        key === "email" ||
        key === "password" ||
        key === "firstName" ||
        key === "lastName"
      ) {
        setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const handleSubmit = async () => {
    const validation = createUserSchema.safeParse({
      email: form.email.trim(),
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    });

    if (!validation.success) {
      const flattened = validation.error.flatten().fieldErrors;
      setFieldErrors({
        email: flattened.email?.[0],
        password: flattened.password?.[0],
        firstName: flattened.firstName?.[0],
        lastName: flattened.lastName?.[0],
      });
      setSubmitError(null);
      return;
    }

    setFieldErrors({});
    setSubmitError(null);

    try {
      await createUser({
        variables: {
          user: {
            auth: {
              email: form.email.trim(),
              password: form.password,
            },
            profile: {
              ...(form.firstName.trim()
                ? { first_name: form.firstName.trim() }
                : {}),
              ...(form.lastName.trim()
                ? { last_name: form.lastName.trim() }
                : {}),
            },
            cvsIds: [],
            role: form.role,
            ...(form.departmentId ? { departmentId: form.departmentId } : {}),
            ...(form.positionId ? { positionId: form.positionId } : {}),
          },
        },
      });

      onCreated();
      onClose();
    } catch {
      setSubmitError("Failed to create user");
    }
  };

  const roleOptions = ["Employee", "Admin"];
  const departments = optionsData?.departments ?? [];
  const positions = optionsData?.positions ?? [];
  const isBusy = loading || loadingOptions;
  const selectMenuProps = { sx: usersTableSx.editDialogSelectMenu };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={usersTableSx.editDialogRoot}
    >
      <DialogTitle sx={usersTableSx.editDialogTitle}>
        Add user
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={usersTableSx.editDialogCloseBtn}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={usersTableSx.editDialogContent}>
        <Box sx={usersTableSx.editDialogGrid}>
          <TextField
            label="Email"
            value={form.email}
            onChange={handleField("email")}
            fullWidth
            error={Boolean(fieldErrors.email)}
            helperText={fieldErrors.email}
            sx={usersTableSx.editDialogField}
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleField("password")}
            fullWidth
            error={Boolean(fieldErrors.password)}
            helperText={fieldErrors.password}
            sx={usersTableSx.editDialogField}
          />
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={handleField("firstName")}
            fullWidth
            error={Boolean(fieldErrors.firstName)}
            helperText={fieldErrors.firstName}
            sx={usersTableSx.editDialogField}
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={handleField("lastName")}
            fullWidth
            error={Boolean(fieldErrors.lastName)}
            helperText={fieldErrors.lastName}
            sx={usersTableSx.editDialogField}
          />
          <TextField
            select
            label="Department"
            value={form.departmentId}
            onChange={handleField("departmentId")}
            fullWidth
            sx={usersTableSx.editDialogField}
            slotProps={{ select: { MenuProps: selectMenuProps } }}
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Position"
            value={form.positionId}
            onChange={handleField("positionId")}
            fullWidth
            sx={usersTableSx.editDialogField}
            slotProps={{ select: { MenuProps: selectMenuProps } }}
          >
            {positions.map((position) => (
              <MenuItem key={position.id} value={position.id}>
                {position.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={usersTableSx.editDialogSpacer}>
            <TextField
              select
              label="Role"
              value={form.role}
              onChange={handleField("role")}
              fullWidth
              sx={usersTableSx.editDialogField}
              slotProps={{ select: { MenuProps: selectMenuProps } }}
            >
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
        {error ? <Alert severity="error">{error.message}</Alert> : null}
      </DialogContent>
      <DialogActions sx={usersTableSx.editDialogActions}>
        <Button
          onClick={onClose}
          disabled={isBusy}
          sx={usersTableSx.editDialogCancelBtn}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isBusy}
          sx={usersTableSx.editDialogUpdateBtn}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
