/** GraphQL `profile(userId)` payload (subset used on Languages page). */
export type ProfileEntity = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
};

/** Language row embedded on profile (matches `profile.languages` on API). */
export type UserLanguageRow = {
  name: string;
  proficiency: string;
};
