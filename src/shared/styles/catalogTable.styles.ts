import { catalogPageSx } from "./catalogPage.styles";
import { catalogFilterSx } from "./filter.styles";
import { dataTableSx } from "./dataTable.styles";
import { deleteDialogSx } from "./deleteDialog.styles";
import { rowMenuSx } from "./rowMenu.styles";
import { searchFieldSx } from "./searchField.styles";

export const catalogTableSx = {
  ...catalogPageSx,
  ...searchFieldSx,
  ...dataTableSx,
  ...catalogFilterSx,
  ...rowMenuSx,
  ...deleteDialogSx,
} as const;
