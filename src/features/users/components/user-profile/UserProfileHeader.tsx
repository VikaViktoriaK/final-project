"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import {
  USER_PROFILE_FALLBACK_MEMBER_SINCE,
  USER_PROFILE_UPLOAD_HINT,
} from "@/features/users/constants/userProfile.constants";
import { useAvatarUpload } from "@/features/users/hooks/useAvatarUpload";
import type { UserProfileHeaderProps } from "@/features/users/types/userProfileHeader.types";
import type { AvatarUploadState } from "@/features/users/types/userProfile.types";
import { AVATAR_FILE_ACCEPT } from "@/features/users/utils/avatarFile";
import {
  getAvatarInitial,
  getUserFullName,
} from "@/features/users/utils/userProfile.utils";
import { userProfileSx } from "./userProfile.styles";

type UserProfileHeaderContainerProps = UserProfileHeaderProps & {
  onAvatarSelected: (avatar: AvatarUploadState) => void;
};

export function UserProfileHeader({
  user,
  memberSinceText,
  canEditProfile,
  avatarPreviewUrl,
  onAvatarSelected,
  onRemoveAvatar,
  canRemoveAvatar = false,
  removeAvatarButtonLabel = "Remove photo",
  isRemovingAvatar = false,
}: UserProfileHeaderContainerProps) {
  const {
    fileInputRef,
    uploadError,
    isDragging,
    openFileDialog,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useAvatarUpload({
    canEdit: canEditProfile,
    onSelected: onAvatarSelected,
  });

  const fullName = getUserFullName(user);
  const avatarInitial = getAvatarInitial(user);
  const avatarSrc = avatarPreviewUrl ?? user.avatarUrl;

  const handleRemoveClick = () => {
    if (!onRemoveAvatar || !canRemoveAvatar || isRemovingAvatar) return;
    void onRemoveAvatar();
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
          accept={AVATAR_FILE_ACCEPT}
          hidden
          onChange={handleFileChange}
        />
        <Box
          sx={[
            userProfileSx.avatarDropZone,
            !canEditProfile && userProfileSx.avatarDropZoneDisabled,
            isDragging && canEditProfile && userProfileSx.avatarDropZoneActive,
          ]}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="region"
          aria-label="Avatar upload: click the button or drop an image file"
        >
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
            {uploadError ? (
              <Typography sx={userProfileSx.formError} role="alert">
                {uploadError}
              </Typography>
            ) : null}
            {canRemoveAvatar && onRemoveAvatar ? (
              <Button
                type="button"
                variant="text"
                size="small"
                sx={userProfileSx.removePhotoBtn}
                disabled={isRemovingAvatar}
                onClick={handleRemoveClick}
              >
                {isRemovingAvatar ? "Removing…" : removeAvatarButtonLabel}
              </Button>
            ) : null}
          </Box>
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
