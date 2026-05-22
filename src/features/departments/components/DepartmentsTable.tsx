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
import type { DepartmentRow } from "../types";
import { DepartmentsTableRow } from "./DepartmentsTableRow";
import { departmentsTableSx } from "./departmentsTable.styles";

type DepartmentsTableProps = {
  departments: DepartmentRow[];
  order: "asc" | "desc";
  onSort: () => void;
  onEdit: (department: DepartmentRow) => void;
  onDelete: (department: DepartmentRow) => void;
  canManage: boolean;
};

export function DepartmentsTable({
  departments,
  order,
  onSort,
  onEdit,
  onDelete,
  canManage,
}: DepartmentsTableProps) {
  const { t } = useTranslation();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={catalogTableSx.tableContainer}
    >
      <Table sx={catalogTableSx.table} aria-label="departments table">
        <colgroup>
          <col />
          <col style={{ width: catalogTableSx.catalogActionsColWidth }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell sx={departmentsTableSx.nameHeadCell}>
              <SortableTableHeader
                label={t("common.name")}
                field="name"
                sortField="name"
                sortDirection={order}
                onSort={() => onSort()}
              />
            </TableCell>
            <TableCell sx={departmentsTableSx.actionsHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} sx={catalogTableSx.emptyState}>
                {t("table.departmentsNotFound")}
              </TableCell>
            </TableRow>
          ) : (
            departments.map((department) => (
              <DepartmentsTableRow
                key={department.id}
                department={department}
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
