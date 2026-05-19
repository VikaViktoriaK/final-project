import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";

export function isNativeProficiency(proficiency: string): boolean {
  return /\bnative\b/i.test(proficiency.trim());
}

export function languageRowKey(row: UserLanguageRow): string {
  return `${row.name}:${row.proficiency}`;
}
