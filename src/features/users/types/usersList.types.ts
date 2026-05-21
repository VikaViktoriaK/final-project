import type { UserRow } from "../types";

export type UserSortField = keyof Pick<
  UserRow,
  "firstName" | "lastName" | "email" | "department" | "position"
>;
