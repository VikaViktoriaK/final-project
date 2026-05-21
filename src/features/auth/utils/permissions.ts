import { getAuthUser } from "@/features/auth/lib/auth-storage";

function isAdmin(): boolean {
  const user = getAuthUser();
  return user?.role?.toLowerCase() === "admin";
}

function canManageProjects(): boolean {
  return isAdmin();
}

export { isAdmin, canManageProjects };
