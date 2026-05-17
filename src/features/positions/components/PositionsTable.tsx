"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import type { PositionRow } from "../types";
import { PositionsTableRow } from "./PositionsTableRow";
import { positionsTableSx } from "./positionsTable.styles";
import { usersTableSx } from "@/features/users/components/usersTable.styles";

type PositionsTableProps = {
  positions: PositionRow[];
  order: "asc" | "desc";
  onToggleNameSort: () => void;
  onEdit: (position: PositionRow) => void;
  onDelete: (position: PositionRow) => void;
  canManage: boolean;
};

export function PositionsTable({
  positions,
  order,
  onToggleNameSort,
  onEdit,
  onDelete,
  canManage,
}: PositionsTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={usersTableSx.tableContainer}
    >
      <Table sx={usersTableSx.table} aria-label="positions table">
        <colgroup>
          <col />
          <col style={{ width: 48 }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell
              sx={positionsTableSx.nameHeadCell}
              aria-sort={order === "asc" ? "ascending" : "descending"}
            >
              <Box
                component="button"
                type="button"
                onClick={onToggleNameSort}
                aria-label={`Sort by name, ${order === "asc" ? "ascending" : "descending"}`}
                sx={{
                  ...usersTableSx.headDepartmentLabel,
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
            <TableCell sx={positionsTableSx.actionsHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} sx={usersTableSx.emptyState}>
                Positions not found
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
