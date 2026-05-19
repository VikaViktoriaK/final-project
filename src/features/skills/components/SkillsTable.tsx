import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { SkillRow, SkillsSortField } from "../types";
import { SkillsTableRow } from "./SkillsTableRow";
import { skillsTableSx } from "./skillsTable.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

type SkillsTableProps = {
  skills: SkillRow[];
  orderBy: SkillsSortField;
  order: "asc" | "desc";
  onSort: (field: SkillsSortField) => void;
  onEdit: (skill: SkillRow) => void;
  onDelete: (skill: SkillRow) => void;
  canManage: boolean;
};

function SortableHead({
  label,
  field,
  orderBy,
  order,
  onSort,
  sx,
}: {
  label: string;
  field: SkillsSortField;
  orderBy: SkillsSortField;
  order: "asc" | "desc";
  onSort: (field: SkillsSortField) => void;
  sx: object;
}) {
  const active = orderBy === field;
  return (
    <TableCell
      sx={sx}
      aria-sort={
        active ? (order === "asc" ? "ascending" : "descending") : "none"
      }
    >
      <Box
        component="button"
        type="button"
        onClick={() => onSort(field)}
        aria-label={`Sort by ${label.toLowerCase()}${active ? `, ${order}` : ""}`}
        sx={{
          ...skillsTableSx.sortButton,
          border: "none",
          background: "none",
          padding: 0,
          cursor: "pointer",
          color: "inherit",
          font: "inherit",
        }}
      >
        <span>{label}</span>
        {active ? (
          <ArrowUpwardIcon
            sx={{
              transform: order === "desc" ? "rotate(180deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          />
        ) : null}
      </Box>
    </TableCell>
  );
}

export function SkillsTable({
  skills,
  orderBy,
  order,
  onSort,
  onEdit,
  onDelete,
  canManage,
}: SkillsTableProps) {
  const handleSort = (field: SkillsSortField) => {
    onSort(field);
  };

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
          <col style={{ width: 48 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <SortableHead
              label="Name"
              field="name"
              orderBy={orderBy}
              order={order}
              onSort={handleSort}
              sx={skillsTableSx.nameHeadCell}
            />
            <SortableHead
              label="Category"
              field="category"
              orderBy={orderBy}
              order={order}
              onSort={handleSort}
              sx={skillsTableSx.categoryHeadCell}
            />
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
