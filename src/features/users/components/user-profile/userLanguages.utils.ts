/** Maps proficiency label to mock palette (e.g. Native = accent, B2 = green). */
export function isNativeProficiency(proficiency: string): boolean {
  return /\bnative\b/i.test(proficiency.trim());
}
