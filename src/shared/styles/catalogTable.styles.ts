import { catalogPageSx } from "./catalogPage.styles";
import { catalogFilterSx } from "./filter.styles";
import { catalogTableActionsSx } from "./catalogTableActions.styles";
import { catalogTableHeadSx } from "./catalogTableHead.styles";
import { dataTableSx } from "./dataTable.styles";
import { deleteDialogSx } from "./deleteDialog.styles";
import { rowMenuSx } from "./rowMenu.styles";
import { searchFieldSx } from "./searchField.styles";

export const catalogTableSx = {
  ...catalogPageSx,
  ...searchFieldSx,
  ...dataTableSx,
  ...catalogFilterSx,
  ...catalogTableHeadSx,
  ...catalogTableActionsSx,
  ...rowMenuSx,
  ...deleteDialogSx,
  catalogActionsColWidth: catalogTableActionsSx.colWidth,
  catalogActionsHeadCell: catalogTableActionsSx.headCell,
  catalogActionsCell: catalogTableActionsSx.cell,
  catalogActionsMenuButton: catalogTableActionsSx.menuButton,
} as const;
