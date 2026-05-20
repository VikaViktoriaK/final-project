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

/** Item from root `languages` catalog query (shape may vary — adjust fields to match API). */
export type LanguageCatalogItem = {
  id?: string | null;
  name: string;
};
