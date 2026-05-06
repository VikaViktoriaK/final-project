export interface UserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId?: string;
  department: string;
  positionId?: string;
  position: string;
  role?: string;
  avatarUrl?: string;
}
