export const USER_PROFILE_TABS = ["Profile", "Skills", "Languages"] as const;

export const USER_PROFILE_FORM_LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  department: "Department",
  position: "Position",
} as const;

/** Max avatar file size (500 KiB). */
export const USER_PROFILE_AVATAR_MAX_BYTES = 500 * 1024;

export const USER_PROFILE_AVATAR_SIZE_ERROR = "Photo must not exceed 500 KB.";

export const USER_PROFILE_AVATAR_ACCEPT_MIMES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
] as const;

export const USER_PROFILE_AVATAR_TYPE_ERROR =
  "Please use a PNG, JPG, or GIF image.";

export const USER_PROFILE_UPLOAD_HINT = "png, jpg or gif no more than 0.5MB";

/** Clears a new file chosen before Save (no API call). */
export const USER_PROFILE_DISCARD_AVATAR_SELECTION = "Discard selected photo";

/** Removes the saved profile photo via `deleteAvatar` (admin: any user; employee: own profile only). */
export const USER_PROFILE_REMOVE_PROFILE_PHOTO = "Remove profile photo";

export const USER_PROFILE_FALLBACK_MEMBER_SINCE = "A member";
