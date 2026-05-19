"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import type { UserRow } from "../types";
import { USER_EDIT_DIALOG } from "@/features/users/constants/users.constants";
import { UserEditDialogForm } from "./UserEditDialogForm";
import { editDialogSx } from "./styles/editDialog.styles";

type UserEditDialogProps = {
  open: boolean;
  user: UserRow | null;
  onClose: () => void;
  onSaved: () => void;
};

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
      sx={editDialogSx.editDialogRoot}
    >
      <DialogTitle sx={editDialogSx.editDialogTitle}>
        {USER_EDIT_DIALOG.title}
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={editDialogSx.editDialogCloseBtn}
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
