import { catalogPageSx } from "./styles/catalogPage.styles";
import { dataTableSx } from "./styles/dataTable.styles";
import { deleteDialogSx } from "./styles/deleteDialog.styles";
import { editDialogSx } from "./styles/editDialog.styles";
import { filterSx } from "./styles/filter.styles";
import { rowMenuSx } from "./styles/rowMenu.styles";
import { searchFieldSx } from "./styles/searchField.styles";

export { catalogPageSx } from "./styles/catalogPage.styles";
export { dataTableSx } from "./styles/dataTable.styles";
export { deleteDialogSx } from "./styles/deleteDialog.styles";
export { editDialogSx } from "./styles/editDialog.styles";
export { filterSx } from "./styles/filter.styles";
export { rowMenuSx } from "./styles/rowMenu.styles";
export { searchFieldSx } from "./styles/searchField.styles";

export const usersTableSx = {
  ...catalogPageSx,
  ...searchFieldSx,
  ...dataTableSx,
  ...filterSx,
  ...rowMenuSx,
  ...deleteDialogSx,
  ...editDialogSx,
} as const;
