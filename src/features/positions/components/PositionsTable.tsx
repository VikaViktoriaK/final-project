import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "@/i18n/use-translation";
import { SortableTableHeader } from "@/shared/ui/catalog/SortableTableHeader";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";
import type { PositionRow } from "../types";
import { PositionsTableRow } from "./PositionsTableRow";
import { positionsTableSx } from "./positionsTable.styles";

type PositionsTableProps = {
  positions: PositionRow[];
  order: "asc" | "desc";
  onSort: () => void;
  onEdit: (position: PositionRow) => void;
  onDelete: (position: PositionRow) => void;
  canManage: boolean;
};

export function PositionsTable({
  positions,
  order,
  onSort,
  onEdit,
  onDelete,
  canManage,
}: PositionsTableProps) {
  const { t } = useTranslation();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={catalogTableSx.tableContainer}
    >
      <Table sx={catalogTableSx.table} aria-label="positions table">
        <colgroup>
          <col />
          <col style={{ width: catalogTableSx.catalogActionsColWidth }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell sx={positionsTableSx.nameHeadCell}>
              <SortableTableHeader
                label={t("common.name")}
                field="name"
                sortField="name"
                sortDirection={order}
                onSort={() => onSort()}
              />
            </TableCell>
            <TableCell sx={positionsTableSx.actionsHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} sx={catalogTableSx.emptyState}>
                {t("table.positionsNotFound")}
              </TableCell>
            </TableRow>
          ) : (
            positions.map((position) => (
              <PositionsTableRow
                key={position.id}
                position={position}
                onEdit={onEdit}
                onDelete={onDelete}
                canManage={canManage}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
