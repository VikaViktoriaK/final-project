import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import {
  USER_PROFILE_FALLBACK_MEMBER_SINCE,
  USER_PROFILE_UPLOAD_HINT,
} from "@/features/users/constants/userProfile.constants";
import type { UserRow } from "@/features/users/types";
import { userProfileSx } from "./userProfile.styles";

type UserProfileHeaderProps = {
  user: UserRow;
  memberSinceText: string;
};

export function UserProfileHeader({
  user,
  memberSinceText,
}: UserProfileHeaderProps) {
  const fullName = `${user.firstName} ${user.lastName}`.trim() || "User";
  const avatarInitial = (
    user.firstName?.[0] ??
    user.email?.[0] ??
    "U"
  ).toUpperCase();

  return (
    <>
      <Box sx={userProfileSx.headerRow}>
        <Avatar src={user.avatarUrl} sx={userProfileSx.avatar}>
          {avatarInitial}
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
        <Typography sx={userProfileSx.fullName}>{fullName}</Typography>
        <Typography sx={userProfileSx.email}>{user.email}</Typography>
        <Typography sx={userProfileSx.memberSince}>
          {memberSinceText || USER_PROFILE_FALLBACK_MEMBER_SINCE}
        </Typography>
      </Box>
    </>
  );
}
