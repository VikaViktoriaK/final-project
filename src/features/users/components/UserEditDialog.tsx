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
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";

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

const ROLE_OPTIONS = ["Employee", "Admin"];

const SELECT_MENU_PROPS = { sx: usersTableSx.editDialogSelectMenu };

function getInitialForm(user: UserRow): FormState {
  return {
    email: user.email ?? "",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    departmentId: user.departmentId ?? "",
    positionId: user.positionId ?? "",
    role: user.role || "Employee",
  };
}

function extractGraphqlErrorMessage(err: unknown): string {
  const anyErr = err as {
    message?: string;
    graphQLErrors?: Array<{
      message?: string;
      extensions?: {
        response?: {
          message?: unknown;
          error?: unknown;
          statusCode?: unknown;
        };
      };
    }>;
  };

  const gql = anyErr?.graphQLErrors?.[0];
  const extMsg = gql?.extensions?.response?.message;

  if (Array.isArray(extMsg)) return extMsg.filter(Boolean).join(", ");
  if (typeof extMsg === "string") return extMsg;

  if (typeof gql?.message === "string" && gql.message) return gql.message;
  if (typeof anyErr?.message === "string" && anyErr.message)
    return anyErr.message;

  return "Bad Request";
}

type UserEditDialogFormProps = {
  user: UserRow;
  onClose: () => void;
  onSaved: () => void;
};

function UserEditDialogForm({
  user,
  onClose,
  onSaved,
}: UserEditDialogFormProps) {
  const [form, setForm] = React.useState<FormState>(() => getInitialForm(user));
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const [updateUser, { loading: updatingUser, error: updateUserError }] =
    useUpdateUserMutation();
  const [
    updateProfile,
    { loading: updatingProfile, error: updateProfileError },
  ] = useUpdateProfileMutation();
  const { data: optionsData, loading: loadingOptions } =
    useUserEditOptionsQuery();

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const handleFieldChange =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSave = async () => {
    setSubmitError(null);

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();

    if (isAdmin) {
      const userUpdate: {
        userId: string;
        role?: string;
        departmentId?: string;
        positionId?: string;
      } = {
        userId: user.id,
        ...(form.departmentId ? { departmentId: form.departmentId } : {}),
        ...(form.positionId ? { positionId: form.positionId } : {}),
        role: form.role,
      };

      try {
        await updateUser({
          variables: { user: userUpdate },
        });
      } catch (e) {
        setSubmitError(`updateUser: ${extractGraphqlErrorMessage(e)}`);
        return;
      }
    }

    try {
      await updateProfile({
        variables: {
          profile: {
            userId: user.id,
            first_name: firstName || user.firstName,
            last_name: lastName || user.lastName,
          },
        },
      });
    } catch (e) {
      setSubmitError(`updateProfile: ${extractGraphqlErrorMessage(e)}`);
      return;
    }

    onSaved();
    onClose();
  };

  const departments = optionsData?.departments ?? [];
  const positions = optionsData?.positions ?? [];
  const loading = updatingUser || updatingProfile || loadingOptions;
  const error = updateUserError ?? updateProfileError;

  return (
    <>
      <DialogContent sx={usersTableSx.editDialogContent}>
        <Box sx={usersTableSx.editDialogGrid}>
          <TextField
            label="Email"
            value={form.email}
            onChange={handleFieldChange("email")}
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
            onChange={handleFieldChange("firstName")}
            fullWidth
            sx={usersTableSx.editDialogField}
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={handleFieldChange("lastName")}
            fullWidth
            sx={usersTableSx.editDialogField}
          />
          <TextField
            select
            label="Department"
            value={form.departmentId}
            onChange={handleFieldChange("departmentId")}
            fullWidth
            sx={usersTableSx.editDialogField}
            slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
            disabled={!isAdmin}
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
            onChange={handleFieldChange("positionId")}
            fullWidth
            sx={usersTableSx.editDialogField}
            slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
            disabled={!isAdmin}
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
              onChange={handleFieldChange("role")}
              fullWidth
              sx={usersTableSx.editDialogField}
              slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
              disabled={!isAdmin}
            >
              {ROLE_OPTIONS.map((roleName) => (
                <MenuItem key={roleName} value={roleName}>
                  {roleName}
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
          disabled={loading}
          sx={usersTableSx.editDialogCancelBtn}
        >
          Cancel
        </Button>
        <Button
          onClick={() => void handleSave()}
          variant="contained"
          disabled={loading}
          sx={usersTableSx.editDialogUpdateBtn}
        >
          Update
        </Button>
      </DialogActions>
    </>
  );
}

export function UserEditDialog({
  open,
  user,
  onClose,
  onSaved,
}: UserEditDialogProps) {
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
      {open && user ? (
        <UserEditDialogForm
          key={user.id}
          user={user}
          onClose={onClose}
          onSaved={onSaved}
        />
      ) : null}
    </Dialog>
  );
}
