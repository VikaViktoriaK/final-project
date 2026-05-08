import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {
  USER_PROFILE_FORM_LABELS,
  USER_PROFILE_STATIC_DATA,
} from "@/features/users/constants/userProfile.constants";
import { userProfileSx } from "./userProfile.styles";

const DEPARTMENT_OPTIONS = ["React"] as const;
const POSITION_OPTIONS = ["Software Engineer"] as const;

export function UserProfileForm() {
  return (
    <>
      <Box sx={userProfileSx.formGrid}>
        <TextField
          label={USER_PROFILE_FORM_LABELS.firstName}
          value={USER_PROFILE_STATIC_DATA.firstName}
          sx={userProfileSx.field}
        />
        <TextField
          label={USER_PROFILE_FORM_LABELS.lastName}
          value={USER_PROFILE_STATIC_DATA.lastName}
          sx={userProfileSx.field}
        />
        <TextField
          select
          label={USER_PROFILE_FORM_LABELS.department}
          value={USER_PROFILE_STATIC_DATA.department}
          sx={userProfileSx.field}
        >
          {DEPARTMENT_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label={USER_PROFILE_FORM_LABELS.position}
          value={USER_PROFILE_STATIC_DATA.position}
          sx={userProfileSx.field}
        >
          {POSITION_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={userProfileSx.updateBtnWrap}>
        <Button variant="contained" sx={userProfileSx.updateBtn}>
          Update
        </Button>
      </Box>
    </>
  );
}
