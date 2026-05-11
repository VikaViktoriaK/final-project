import * as React from "react";
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
  canEditProfile: boolean;
  avatarPreviewUrl?: string;
  onAvatarSelected: (avatar: {
    previewUrl: string;
    /** Same as previewUrl: full data URL for upload mutation compatibility. */
    base64: string;
    size: number;
    type: string;
  }) => void;
};

export function UserProfileHeader({
  user,
  memberSinceText,
  canEditProfile,
  avatarPreviewUrl,
  onAvatarSelected,
}: UserProfileHeaderProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const fullName = `${user.firstName} ${user.lastName}`.trim() || "User";
  const avatarInitial = (
    user.firstName?.[0] ??
    user.email?.[0] ??
    "U"
  ).toUpperCase();
  const avatarSrc = avatarPreviewUrl ?? user.avatarUrl;

  const openFileDialog = () => {
    if (!canEditProfile) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Send full data URL in `base64` so Cloudinary treats it as inline image, not a filesystem path.
        onAvatarSelected({
          previewUrl: reader.result,
          base64: reader.result,
          size: file.size,
          type: file.type,
        });
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <>
      <Box sx={userProfileSx.headerRow}>
        <Box
          component="button"
          type="button"
          sx={userProfileSx.avatarButton}
          onClick={openFileDialog}
          disabled={!canEditProfile}
          aria-label="Upload avatar image"
        >
          <Avatar src={avatarSrc} sx={userProfileSx.avatar}>
            {avatarInitial}
          </Avatar>
        </Box>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          hidden
          onChange={handleFileChange}
        />
        <Box sx={userProfileSx.uploadBlock}>
          <Button
            variant="text"
            startIcon={<UploadOutlinedIcon />}
            sx={userProfileSx.uploadBtn}
            onClick={openFileDialog}
            disabled={!canEditProfile}
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
