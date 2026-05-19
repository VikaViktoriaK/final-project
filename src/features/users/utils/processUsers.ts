import { normalizeSearchText, type SortOrder } from "@/lib/search";
import type { UserRow } from "../types";
import type { UserSortField } from "../types/usersList.types";

export function getUserSearchText(user: UserRow): string {
  return `${user.firstName} ${user.lastName} ${user.email}`;
}

export function processUsers(
  users: UserRow[],
  query: string,
  orderBy: UserSortField,
  order: SortOrder,
): UserRow[] {
  const q = normalizeSearchText(query);
  const result = q
    ? users.filter((user) =>
        normalizeSearchText(getUserSearchText(user)).includes(q),
      )
    : [...users];

  result.sort((a, b) => {
    const aValue = normalizeSearchText(String(a[orderBy] ?? ""));
    const bValue = normalizeSearchText(String(b[orderBy] ?? ""));
    const aEmpty = !aValue;
    const bEmpty = !bValue;

    if (aEmpty && !bEmpty) return 1;
    if (!aEmpty && bEmpty) return -1;
    if (aEmpty && bEmpty) return 0;

    const cmp = aValue.localeCompare(bValue, undefined, {
      sensitivity: "base",
    });
    return order === "asc" ? cmp : -cmp;
  });

  return result;
}
