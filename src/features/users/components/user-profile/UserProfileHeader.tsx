import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import {
  USER_PROFILE_STATIC_DATA,
  USER_PROFILE_UPLOAD_HINT,
} from "@/features/users/constants/userProfile.constants";
import { userProfileSx } from "./userProfile.styles";

export function UserProfileHeader() {
  return (
    <>
      <Box sx={userProfileSx.headerRow}>
        <Avatar sx={userProfileSx.avatar}>
          {USER_PROFILE_STATIC_DATA.firstName.slice(0, 1)}
        </Avatar>
        <Box sx={userProfileSx.uploadBlock}>
          <Button
            variant="text"
            startIcon={<UploadOutlinedIcon />}
            sx={userProfileSx.uploadBtn}
          >
            <Typography component="span" sx={userProfileSx.uploadText}>
              Upload avatar image
            </Typography>
          </Button>
          <Typography sx={userProfileSx.uploadHint}>
            {USER_PROFILE_UPLOAD_HINT}
          </Typography>
        </Box>
      </Box>
      <Box sx={userProfileSx.identity}>
        <Typography sx={userProfileSx.fullName}>
          {USER_PROFILE_STATIC_DATA.fullName}
        </Typography>
        <Typography sx={userProfileSx.email}>
          {USER_PROFILE_STATIC_DATA.email}
        </Typography>
        <Typography sx={userProfileSx.memberSince}>
          {USER_PROFILE_STATIC_DATA.memberSince}
        </Typography>
      </Box>
    </>
  );
}
