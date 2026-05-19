"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import type { UserRow } from "@/features/users/types";
import {
  USER_EDIT_DIALOG,
  USER_ROLE_OPTIONS,
} from "@/features/users/constants/users.constants";
import { useUserEditDialog } from "@/features/users/hooks/useUserEditDialog";
import { editDialogSx } from "./styles/editDialog.styles";

const SELECT_MENU_PROPS = { sx: editDialogSx.editDialogSelectMenu };

type UserEditDialogFormProps = {
  user: UserRow;
  onClose: () => void;
  onSaved: () => void;
};

export function UserEditDialogForm({
  user,
  onClose,
  onSaved,
}: UserEditDialogFormProps) {
  const {
    form,
    isAdmin,
    submitError,
    departments,
    positions,
    loading,
    mutationError,
    handleFieldChange,
    handleSave,
  } = useUserEditDialog({ user, onClose, onSaved });

  return (
    <>
      <DialogContent sx={editDialogSx.editDialogContent}>
        <Box sx={editDialogSx.editDialogGrid}>
          <TextField
            label="Email"
            value={form.email}
            onChange={handleFieldChange("email")}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
            sx={editDialogSx.editDialogField}
          />
          <TextField
            label="Password"
            type="password"
            value="**********"
            fullWidth
            slotProps={{ input: { readOnly: true } }}
            sx={editDialogSx.editDialogField}
          />
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={handleFieldChange("firstName")}
            fullWidth
            sx={editDialogSx.editDialogField}
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={handleFieldChange("lastName")}
            fullWidth
            sx={editDialogSx.editDialogField}
          />
          <TextField
            select
            label="Department"
            value={form.departmentId}
            onChange={handleFieldChange("departmentId")}
            fullWidth
            sx={editDialogSx.editDialogField}
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
            sx={editDialogSx.editDialogField}
            slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
            disabled={!isAdmin}
          >
            {positions.map((position) => (
              <MenuItem key={position.id} value={position.id}>
                {position.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={editDialogSx.editDialogSpacer}>
            <TextField
              select
              label="Role"
              value={form.role}
              onChange={handleFieldChange("role")}
              fullWidth
              sx={editDialogSx.editDialogField}
              slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
              disabled={!isAdmin}
            >
              {USER_ROLE_OPTIONS.map((roleName) => (
                <MenuItem key={roleName} value={roleName}>
                  {roleName}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        {submitError ? <Alert severity="error">{submitError}</Alert> : null}
        {mutationError ? (
          <Alert severity="error">{mutationError.message}</Alert>
        ) : null}
      </DialogContent>
      <DialogActions sx={editDialogSx.editDialogActions}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={editDialogSx.editDialogCancelBtn}
        >
          {USER_EDIT_DIALOG.cancel}
        </Button>
        <Button
          onClick={() => void handleSave()}
          variant="contained"
          disabled={loading}
          sx={editDialogSx.editDialogUpdateBtn}
        >
          {USER_EDIT_DIALOG.confirm}
        </Button>
      </DialogActions>
    </>
  );
}
