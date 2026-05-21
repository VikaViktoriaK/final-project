import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SortableTableHeader } from "@/shared/ui/catalog/SortableTableHeader";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";
import type { LanguageRow, LanguagesSortField } from "../types";
import { LanguagesTableRow } from "./LanguagesTableRow";
import { languagesTableSx } from "./languagesTable.styles";

type LanguagesTableProps = {
  languages: LanguageRow[];
  orderBy: LanguagesSortField;
  order: "asc" | "desc";
  onSort: (field: LanguagesSortField) => void;
  onEdit: (language: LanguageRow) => void;
  onDelete: (language: LanguageRow) => void;
  canManage: boolean;
};

export function LanguagesTable({
  languages,
  orderBy,
  order,
  onSort,
  onEdit,
  onDelete,
  canManage,
}: LanguagesTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={catalogTableSx.tableContainer}
    >
      <Table sx={catalogTableSx.table} aria-label="languages catalog table">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "42%" }} />
          <col style={{ width: 72 }} />
          <col style={{ width: catalogTableSx.catalogActionsColWidth }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell sx={languagesTableSx.nameHeadCell}>
              <SortableTableHeader
                label="Name"
                field="name"
                sortField={orderBy}
                sortDirection={order}
                onSort={onSort}
              />
            </TableCell>
            <TableCell sx={languagesTableSx.nativeNameHeadCell}>
              Native name
            </TableCell>
            <TableCell sx={languagesTableSx.iso2HeadCell}>ISO2 code</TableCell>
            <TableCell sx={languagesTableSx.actionsHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {languages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} sx={catalogTableSx.emptyState}>
                Languages not found
              </TableCell>
            </TableRow>
          ) : (
            languages.map((language) => (
              <LanguagesTableRow
                key={language.id}
                language={language}
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
