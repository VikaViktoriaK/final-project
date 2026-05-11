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

export const USER_PROFILE_UPLOAD_HINT = "PNG, JPG or GIF — max 500 KB.";

export const USER_PROFILE_FALLBACK_MEMBER_SINCE = "A member";
