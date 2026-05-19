import { catalogTableSx as sharedCatalogTableSx } from "@/shared/styles/catalogTable.styles";
import { editDialogSx } from "./styles/editDialog.styles";

export {
  catalogPageSx,
  catalogTableSx,
  dataTableSx,
  deleteDialogSx,
  rowMenuSx,
  searchFieldSx,
} from "@/shared/styles";

export { catalogFilterSx as filterSx } from "@/shared/styles/filter.styles";
export { editDialogSx } from "./styles/editDialog.styles";

const catalogWithEditSx = {
  ...sharedCatalogTableSx,
  ...editDialogSx,
} as const;

/** @deprecated Prefer catalogTableSx from @/shared/styles */
export const usersTableSx = {
  ...catalogWithEditSx,
  usersPageContainer: sharedCatalogTableSx.catalogPageContainer,
  addUserBtn: sharedCatalogTableSx.createButton,
  usersFilter: sharedCatalogTableSx.catalogFilter,
  usersFilterSelect: sharedCatalogTableSx.catalogFilterSelect,
  usersFilterOrderBtn: sharedCatalogTableSx.catalogFilterOrderBtn,
} as const;
