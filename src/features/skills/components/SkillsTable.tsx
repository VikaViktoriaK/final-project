import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SortableTableHeader } from "@/shared/ui/catalog/SortableTableHeader";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";
import type { SkillRow, SkillsSortField } from "../types";
import { SkillsTableRow } from "./SkillsTableRow";
import { skillsTableSx } from "./skillsTable.styles";

type SkillsTableProps = {
  skills: SkillRow[];
  orderBy: SkillsSortField;
  order: "asc" | "desc";
  onSort: (field: SkillsSortField) => void;
  onEdit: (skill: SkillRow) => void;
  onDelete: (skill: SkillRow) => void;
  canManage: boolean;
};

export function SkillsTable({
  skills,
  orderBy,
  order,
  onSort,
  onEdit,
  onDelete,
  canManage,
}: SkillsTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={catalogTableSx.tableContainer}
    >
      <Table sx={catalogTableSx.table} aria-label="skills catalog table">
        <colgroup>
          <col style={{ width: "50%" }} />
          <col />
          <col style={{ width: 56 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell sx={skillsTableSx.nameHeadCell}>
              <SortableTableHeader
                label="Name"
                field="name"
                sortField={orderBy}
                sortDirection={order}
                onSort={onSort}
              />
            </TableCell>
            <TableCell sx={skillsTableSx.categoryHeadCell}>
              <SortableTableHeader
                label="Category"
                field="category"
                sortField={orderBy}
                sortDirection={order}
                onSort={onSort}
              />
            </TableCell>
            <TableCell sx={skillsTableSx.actionsHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {skills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} sx={catalogTableSx.emptyState}>
                Skills not found
              </TableCell>
            </TableRow>
          ) : (
            skills.map((skill) => (
              <SkillsTableRow
                key={skill.id}
                skill={skill}
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
