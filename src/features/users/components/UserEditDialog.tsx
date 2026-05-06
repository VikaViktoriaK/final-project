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
import type { UserRow } from "../types";
import {
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useUserEditOptionsQuery,
} from "../api/updateUser";
import { usersTableSx } from "./usersTable.styles";

type UserEditDialogProps = {
  open: boolean;
  user: UserRow | null;
  onClose: () => void;
  onSaved: () => void;
};

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  role: string;
};

const DEFAULT_FORM: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  departmentId: "",
  positionId: "",
  role: "Employee",
};

function getInitialForm(user: UserRow | null): FormState {
  if (!user) return DEFAULT_FORM;
  return {
    email: user.email ?? "",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    departmentId: user.departmentId ?? "",
    positionId: user.positionId ?? "",
    role: user.role || "Employee",
  };
}

export function UserEditDialog({
  open,
  user,
  onClose,
  onSaved,
}: UserEditDialogProps) {
  const [form, setForm] = React.useState<FormState>(() => getInitialForm(user));
  const [updateUser, { loading: updatingUser, error: updateUserError }] =
    useUpdateUserMutation();
  const [
    updateProfile,
    { loading: updatingProfile, error: updateProfileError },
  ] = useUpdateProfileMutation();
  const { data: optionsData, loading: loadingOptions } =
    useUserEditOptionsQuery();

  const handleField =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSave = async () => {
    if (!user) return;

    await updateUser({
      variables: {
        user: {
          userId: user.id,
          role: form.role,
          ...(form.departmentId ? { departmentId: form.departmentId } : {}),
          ...(form.positionId ? { positionId: form.positionId } : {}),
        },
      },
    });
    await updateProfile({
      variables: {
        profile: {
          userId: user.id,
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
        },
      },
    });

    onSaved();
    onClose();
  };

  const roleOptions = ["Employee", "Admin"];
  const departments = optionsData?.departments ?? [];
  const positions = optionsData?.positions ?? [];
  const loading = updatingUser || updatingProfile || loadingOptions;
  const error = updateUserError ?? updateProfileError;
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
        Update user
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
            slotProps={{ input: { readOnly: true } }}
            sx={usersTableSx.editDialogField}
          />
          <TextField
            label="Password"
            type="password"
            value="**********"
            fullWidth
            slotProps={{ input: { readOnly: true } }}
            sx={usersTableSx.editDialogField}
          />
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={handleField("firstName")}
            fullWidth
            sx={usersTableSx.editDialogField}
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={handleField("lastName")}
            fullWidth
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
        {error ? <Alert severity="error">{error.message}</Alert> : null}
      </DialogContent>
      <DialogActions sx={usersTableSx.editDialogActions}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={usersTableSx.editDialogCancelBtn}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading || !user}
          sx={usersTableSx.editDialogUpdateBtn}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
