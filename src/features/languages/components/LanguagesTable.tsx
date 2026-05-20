import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { LanguageRow } from "../types";
import { LanguagesTableRow } from "./LanguagesTableRow";
import { languagesTableSx } from "./languagesTable.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

type LanguagesTableProps = {
  languages: LanguageRow[];
  order: "asc" | "desc";
  onToggleNameSort: () => void;
  onEdit: (language: LanguageRow) => void;
  onDelete: (language: LanguageRow) => void;
  canManage: boolean;
};

export function LanguagesTable({
  languages,
  order,
  onToggleNameSort,
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
          <col />
          <col />
          <col style={{ width: 100 }} />
          <col style={{ width: 48 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell
              sx={languagesTableSx.nameHeadCell}
              aria-sort={order === "asc" ? "ascending" : "descending"}
            >
              <Box
                component="button"
                type="button"
                onClick={onToggleNameSort}
                aria-label={`Sort by name, ${order === "asc" ? "ascending" : "descending"}`}
                sx={{
                  ...languagesTableSx.sortButton,
                  border: "none",
                  background: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "inherit",
                  font: "inherit",
                }}
              >
                <span>Name</span>
                <ArrowUpwardIcon
                  sx={{
                    transform: order === "desc" ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s ease",
                  }}
                />
              </Box>
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
