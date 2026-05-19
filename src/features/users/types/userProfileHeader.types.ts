import type { UserRow } from "../types";

export type UserProfileHeaderProps = {
  user: UserRow;
  memberSinceText: string;
  canEditProfile: boolean;
  avatarPreviewUrl?: string;
  onRemoveAvatar?: () => void | Promise<void>;
  canRemoveAvatar?: boolean;
  removeAvatarButtonLabel?: string;
  isRemovingAvatar?: boolean;
};
