import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { DepartmentRow } from "../types";
import { DepartmentsTableRow } from "./DepartmentsTableRow";
import { departmentsTableSx } from "./departmentsTable.styles";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

type DepartmentsTableProps = {
  departments: DepartmentRow[];
  order: "asc" | "desc";
  onToggleNameSort: () => void;
  onEdit: (department: DepartmentRow) => void;
  onDelete: (department: DepartmentRow) => void;
  canManage: boolean;
};

export function DepartmentsTable({
  departments,
  order,
  onToggleNameSort,
  onEdit,
  onDelete,
  canManage,
}: DepartmentsTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={catalogTableSx.tableContainer}
    >
      <Table sx={catalogTableSx.table} aria-label="departments table">
        <colgroup>
          <col />
          <col style={{ width: 48 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell
              sx={departmentsTableSx.nameHeadCell}
              aria-sort={order === "asc" ? "ascending" : "descending"}
            >
              <Box
                component="button"
                type="button"
                onClick={onToggleNameSort}
                aria-label={`Sort by name, ${order === "asc" ? "ascending" : "descending"}`}
                sx={{
                  ...catalogTableSx.headDepartmentLabel,
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
            <TableCell sx={departmentsTableSx.actionsHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} sx={catalogTableSx.emptyState}>
                Departments not found
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
