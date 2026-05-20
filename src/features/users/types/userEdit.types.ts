import type { UserRow } from "../types";

export type UserEditFormState = {
  email: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  role: string;
};

export function toUserEditFormState(user: UserRow): UserEditFormState {
  return {
    email: user.email ?? "",
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    departmentId: user.departmentId ?? "",
    positionId: user.positionId ?? "",
    role: user.role || "Employee",
  };
}
