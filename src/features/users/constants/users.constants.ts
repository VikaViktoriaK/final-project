import type { UserSortField } from "../types/usersList.types";

export const USERS_PAGE_TITLE = "Employees";

export const USERS_CREATE_LABEL = "+ Create user";

export const USER_DELETE_DIALOG = {
  title: "Delete user",
  cancel: "Cancel",
  confirm: "Delete",
} as const;

export const USER_SORT_OPTIONS: { value: UserSortField; label: string }[] = [
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "email", label: "Email" },
  { value: "department", label: "Department" },
  { value: "position", label: "Position" },
];
