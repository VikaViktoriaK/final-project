import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { USER_PROFILE_FORM_LABELS } from "@/features/users/constants/userProfile.constants";
import type { UserRow } from "@/features/users/types";
import { userProfileSx } from "./userProfile.styles";

type UserProfileFormProps = {
  user: UserRow;
};

export function UserProfileForm({ user }: UserProfileFormProps) {
  return (
    <>
      <Box sx={userProfileSx.formGrid}>
        <TextField
          label={USER_PROFILE_FORM_LABELS.firstName}
          value={user.firstName}
          slotProps={{ htmlInput: { readOnly: true } }}
          sx={userProfileSx.field}
        />
        <TextField
          label={USER_PROFILE_FORM_LABELS.lastName}
          value={user.lastName}
          slotProps={{ htmlInput: { readOnly: true } }}
          sx={userProfileSx.field}
        />
        <TextField
          label={USER_PROFILE_FORM_LABELS.department}
          value={user.department}
          slotProps={{ htmlInput: { readOnly: true } }}
          sx={userProfileSx.field}
        />
        <TextField
          label={USER_PROFILE_FORM_LABELS.position}
          value={user.position}
          slotProps={{ htmlInput: { readOnly: true } }}
          sx={userProfileSx.field}
        />
      </Box>
      <Box sx={userProfileSx.updateBtnWrap}>
        <Button variant="contained" sx={userProfileSx.updateBtn}>
          Update
        </Button>
      </Box>
    </>
  );
}
