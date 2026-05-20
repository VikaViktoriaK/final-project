import type { UserRow } from "../types";

export type ProfileFormState = {
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
};

export type AvatarUploadState = {
  previewUrl: string;
  base64: string;
  size: number;
  type: string;
};

export function toProfileFormState(user: UserRow): ProfileFormState {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    departmentId: user.departmentId ?? "",
    positionId: user.positionId ?? "",
  };
}
