import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import {
  USER_PROFILE_AVATAR_ACCEPT_MIMES,
  USER_PROFILE_AVATAR_MAX_BYTES,
  USER_PROFILE_AVATAR_SIZE_ERROR,
  USER_PROFILE_AVATAR_TYPE_ERROR,
  USER_PROFILE_FALLBACK_MEMBER_SINCE,
  USER_PROFILE_UPLOAD_HINT,
} from "@/features/users/constants/userProfile.constants";
import type { UserRow } from "@/features/users/types";
import { userProfileSx } from "./userProfile.styles";

const AVATAR_FILE_ACCEPT = USER_PROFILE_AVATAR_ACCEPT_MIMES.join(",");

function isAvatarImageFile(file: File): boolean {
  const allowed = new Set<string>(USER_PROFILE_AVATAR_ACCEPT_MIMES);
  if (allowed.has(file.type)) return true;
  return /\.(png|jpe?g|gif)$/i.test(file.name);
}

type AvatarPayload = {
  previewUrl: string;
  base64: string;
  size: number;
  type: string;
};

type UserProfileHeaderProps = {
  user: UserRow;
  memberSinceText: string;
  canEditProfile: boolean;
  avatarPreviewUrl?: string;
  onAvatarSelected: (avatar: AvatarPayload) => void;
  onRemoveAvatar?: () => void | Promise<void>;
  canRemoveAvatar?: boolean;
  /** Shown on the remove button (e.g. discard vs remove from server). */
  removeAvatarButtonLabel?: string;
  isRemovingAvatar?: boolean;
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
}: UserProfileHeaderProps) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadSizeError, setUploadSizeError] = React.useState<string | null>(
    null,
  );
  const [isDragging, setIsDragging] = React.useState(false);
  const dragDepthRef = React.useRef(0);

  const fullName = `${user.firstName} ${user.lastName}`.trim() || "User";
  const avatarInitial = (
    user.firstName?.[0] ??
    user.email?.[0] ??
    "U"
  ).toUpperCase();
  const avatarSrc = avatarPreviewUrl ?? user.avatarUrl;

  const processFile = React.useCallback(
    (file: File) => {
      if (!isAvatarImageFile(file)) {
        setUploadSizeError(USER_PROFILE_AVATAR_TYPE_ERROR);
        return;
      }
      if (file.size > USER_PROFILE_AVATAR_MAX_BYTES) {
        setUploadSizeError(USER_PROFILE_AVATAR_SIZE_ERROR);
        return;
      }
      setUploadSizeError(null);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onAvatarSelected({
            previewUrl: reader.result,
            base64: reader.result,
            size: file.size,
            type: file.type || "image/jpeg",
          });
        }
      };
      reader.readAsDataURL(file);
    },
    [onAvatarSelected],
  );

  const openFileDialog = () => {
    if (!canEditProfile) return;
    setUploadSizeError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    processFile(file);
  };

  const handleDragEnter = (event: React.DragEvent) => {
    if (!canEditProfile) return;
    event.preventDefault();
    event.stopPropagation();
    dragDepthRef.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    if (!canEditProfile) return;
    event.preventDefault();
    event.stopPropagation();
    dragDepthRef.current -= 1;
    if (dragDepthRef.current <= 0) {
      dragDepthRef.current = 0;
      setIsDragging(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    if (!canEditProfile) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event: React.DragEvent) => {
    if (!canEditProfile) return;
    event.preventDefault();
    event.stopPropagation();
    dragDepthRef.current = 0;
    setIsDragging(false);
    setUploadSizeError(null);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  };

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
            {uploadSizeError ? (
              <Typography sx={userProfileSx.formError} role="alert">
                {uploadSizeError}
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
