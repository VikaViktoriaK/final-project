import {
  USER_PROFILE_AVATAR_ACCEPT_MIMES,
  USER_PROFILE_AVATAR_MAX_BYTES,
  USER_PROFILE_AVATAR_SIZE_ERROR,
  USER_PROFILE_AVATAR_TYPE_ERROR,
} from "@/features/users/constants/userProfile.constants";
import type { AvatarUploadState } from "@/features/users/types/userProfile.types";

export const AVATAR_FILE_ACCEPT = USER_PROFILE_AVATAR_ACCEPT_MIMES.join(",");

export function isAvatarImageFile(file: File): boolean {
  const allowed = new Set<string>(USER_PROFILE_AVATAR_ACCEPT_MIMES);
  if (allowed.has(file.type)) return true;
  return /\.(png|jpe?g|gif)$/i.test(file.name);
}

export type AvatarFileValidationError =
  | typeof USER_PROFILE_AVATAR_TYPE_ERROR
  | typeof USER_PROFILE_AVATAR_SIZE_ERROR;

export function validateAvatarFile(
  file: File,
): AvatarFileValidationError | null {
  if (!isAvatarImageFile(file)) {
    return USER_PROFILE_AVATAR_TYPE_ERROR;
  }
  if (file.size > USER_PROFILE_AVATAR_MAX_BYTES) {
    return USER_PROFILE_AVATAR_SIZE_ERROR;
  }
  return null;
}

export function readAvatarFile(
  file: File,
  onSuccess: (payload: AvatarUploadState) => void,
): void {
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      onSuccess({
        previewUrl: reader.result,
        base64: reader.result,
        size: file.size,
        type: file.type || "image/jpeg",
      });
    }
  };
  reader.readAsDataURL(file);
}
