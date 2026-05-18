import { getAuthUser } from "@/features/auth/lib/auth-storage";
import type { Cv } from "../types";

function isAdmin(): boolean {
  const user = getAuthUser();
  return user?.role?.toLowerCase() === "admin";
}

function canManageCv(cv: Cv): boolean {
  const user = getAuthUser();
  if (!user) {
    return false;
  }
  if (isAdmin()) {
    return true;
  }
  return cv.user?.id === user.id;
}

function canCreateCv(): boolean {
  return Boolean(getAuthUser());
}

export { canManageCv, canCreateCv };
