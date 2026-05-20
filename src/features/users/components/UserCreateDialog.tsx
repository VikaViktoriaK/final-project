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
import { editDialogSx } from "@/features/users/components/styles/editDialog.styles";
import { useUserCreateDialog } from "@/features/users/hooks/useUserCreateDialog";

type UserCreateDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const SELECT_MENU_PROPS = { sx: editDialogSx.editDialogSelectMenu };

export function UserCreateDialog({
  open,
  onClose,
  onCreated,
}: UserCreateDialogProps) {
  const {
    form,
    submitError,
    fieldErrors,
    mutationError,
    departments,
    positions,
    roleOptions,
    isBusy,
    handleField,
    handleSubmit,
  } = useUserCreateDialog({ onClose, onCreated });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={editDialogSx.editDialogRoot}
    >
      <DialogTitle sx={editDialogSx.editDialogTitle}>
        Add user
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={editDialogSx.editDialogCloseBtn}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={editDialogSx.editDialogContent}>
        <Box sx={editDialogSx.editDialogGrid}>
          <TextField
            label="Email"
            value={form.email}
            onChange={handleField("email")}
            fullWidth
            error={Boolean(fieldErrors.email)}
            helperText={fieldErrors.email}
            sx={editDialogSx.editDialogField}
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleField("password")}
            fullWidth
            error={Boolean(fieldErrors.password)}
            helperText={fieldErrors.password}
            sx={editDialogSx.editDialogField}
          />
          <TextField
            label="First Name"
            value={form.firstName}
            onChange={handleField("firstName")}
            fullWidth
            error={Boolean(fieldErrors.firstName)}
            helperText={fieldErrors.firstName}
            sx={editDialogSx.editDialogField}
          />
          <TextField
            label="Last Name"
            value={form.lastName}
            onChange={handleField("lastName")}
            fullWidth
            error={Boolean(fieldErrors.lastName)}
            helperText={fieldErrors.lastName}
            sx={editDialogSx.editDialogField}
          />
          <TextField
            select
            label="Department"
            value={form.departmentId}
            onChange={handleField("departmentId")}
            fullWidth
            sx={editDialogSx.editDialogField}
            slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
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
            sx={editDialogSx.editDialogField}
            slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
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
              onChange={handleField("role")}
              fullWidth
              sx={editDialogSx.editDialogField}
              slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
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
        {mutationError ? (
          <Alert severity="error">{mutationError.message}</Alert>
        ) : null}
      </DialogContent>
      <DialogActions sx={editDialogSx.editDialogActions}>
        <Button
          onClick={onClose}
          disabled={isBusy}
          sx={editDialogSx.editDialogCancelBtn}
        >
          Cancel
        </Button>
        <Button
          onClick={() => void handleSubmit()}
          variant="contained"
          disabled={isBusy}
          sx={editDialogSx.editDialogUpdateBtn}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
