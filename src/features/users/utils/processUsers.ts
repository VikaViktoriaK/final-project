import { normalizeSearchText, type SortOrder } from "@/lib/search";
import type { UserRow } from "../types";
import type { UserSortField } from "../types/usersList.types";

export function getUserSearchText(user: UserRow): string {
  return `${user.firstName} ${user.lastName} ${user.email}`;
}

function compareUserField(a: string, b: string, order: SortOrder): number {
  const aTrim = a.trim();
  const bTrim = b.trim();
  const aEmpty = !aTrim;
  const bEmpty = !bTrim;

  if (aEmpty && !bEmpty) return 1;
  if (!aEmpty && bEmpty) return -1;
  if (aEmpty && bEmpty) return 0;

  const cmp = aTrim.localeCompare(bTrim, undefined, { sensitivity: "base" });
  return order === "asc" ? cmp : -cmp;
}

export function processUsers(
  users: UserRow[],
  query: string,
  orderBy: UserSortField,
  order: SortOrder,
): UserRow[] {
  const q = normalizeSearchText(query);
  const filtered = q
    ? users.filter((user) =>
        normalizeSearchText(getUserSearchText(user)).includes(q),
      )
    : users;

  const sorted = [...filtered];
  sorted.sort((a, b) =>
    compareUserField(String(a[orderBy] ?? ""), String(b[orderBy] ?? ""), order),
  );

  return sorted;
}
