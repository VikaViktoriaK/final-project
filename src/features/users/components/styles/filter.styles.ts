import { catalogFilterSx } from "@/shared/styles/filter.styles";

/** @deprecated Use catalogFilterSx from @/shared/styles */
export const filterSx = {
  usersFilter: catalogFilterSx.catalogFilter,
  usersFilterSelect: catalogFilterSx.catalogFilterSelect,
  usersFilterOrderBtn: catalogFilterSx.catalogFilterOrderBtn,
} as const;

export { catalogFilterSx };
