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
  ...rowMenuSx,
  ...deleteDialogSx,
  catalogActionsColWidth: catalogTableActionsSx.colWidth,
  catalogActionsHeadCell: catalogTableActionsSx.actionsHeadCell,
  catalogActionsCell: catalogTableActionsSx.actionsCell,
  catalogActionsMenuButton: catalogTableActionsSx.menuButton,
} as const;
