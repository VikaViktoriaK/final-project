"use client";

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NextLink from "next/link";
import { TableSortArrowIcon } from "@/components/app-arrow";
import { Fragment, type MouseEvent } from "react";
import type { Cv } from "../../shared/types";
import type { CvSortField, SortDirection } from "../../list/utils/cv-list";
import { cvsStyles } from "../../styles/cvs.styles";

type CvsTableProps = {
  cvs: Cv[];
  canManageCv: (cv: Cv) => boolean;
  sortField: CvSortField;
  sortDirection: SortDirection;
  onSort: (field: CvSortField) => void;
  menuAnchor: HTMLElement | null;
  editHref: string;
  onOpenMenu: (event: MouseEvent<HTMLElement>, cv: Cv) => void;
  onCloseMenu: () => void;
  onDelete: () => void;
};

type CvRowMenuProps = {
  cv: Cv;
  showMenu: boolean;
  onOpenMenu: (event: MouseEvent<HTMLElement>, cv: Cv) => void;
};

function CvRowMenu({ cv, showMenu, onOpenMenu }: CvRowMenuProps) {
  if (!showMenu) {
    return null;
  }

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    onOpenMenu(event, cv);
  };

  return (
    <IconButton
      type="button"
      size="small"
      aria-label="CV actions"
      onClick={handleOpenMenu}
      sx={cvsStyles.menuIconButton}
    >
      <MoreVertIcon />
    </IconButton>
  );
}

type SortHeaderProps = {
  label: string;
  field: CvSortField;
  sortField: CvSortField;
  sortDirection: SortDirection;
  onSort: (field: CvSortField) => void;
};

function SortHeader({
  label,
  field,
  sortField,
  sortDirection,
  onSort,
}: SortHeaderProps) {
  const handleClick = () => {
    onSort(field);
  };

  const isActive = sortField === field;

  return (
    <TableSortLabel
      active={isActive}
      direction={isActive ? sortDirection : "asc"}
      onClick={handleClick}
      IconComponent={TableSortArrowIcon}
      sx={cvsStyles.tableSortLabel}
    >
      {label}
    </TableSortLabel>
  );
}

type CvNameCellProps = {
  cv: Cv;
};

function CvNameCell({ cv }: CvNameCellProps) {
  return (
    <Box sx={cvsStyles.tableNameStack}>
      <Box
        component={NextLink}
        href={`/cvs/${cv.id}/details`}
        sx={cvsStyles.tableNamePrimary}
      >
        {cv.name}
      </Box>
    </Box>
  );
}

function CvDescriptionRow({ cv }: CvNameCellProps) {
  if (!cv.description?.trim()) {
    return null;
  }

  return (
    <TableRow sx={cvsStyles.tableDescriptionRow}>
      <TableCell colSpan={4} sx={cvsStyles.tableDescriptionCell}>
        <Typography component="p" sx={cvsStyles.tableNameDescription}>
          {cv.description}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

function CvsTable({
  cvs,
  canManageCv,
  sortField,
  sortDirection,
  onSort,
  menuAnchor,
  editHref,
  onOpenMenu,
  onCloseMenu,
  onDelete,
}: CvsTableProps) {
  return (
    <>
      <Box sx={cvsStyles.tableContainer}>
        <Table sx={cvsStyles.table}>
          <TableHead>
            <TableRow sx={cvsStyles.tableHeadRow}>
              <TableCell
                sx={[cvsStyles.tableHeadCell, cvsStyles.tableHeadCellName]}
              >
                <SortHeader
                  label="Name"
                  field="name"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={onSort}
                />
              </TableCell>
              <TableCell
                sx={[cvsStyles.tableHeadCell, cvsStyles.tableColEducation]}
              >
                <SortHeader
                  label="Education"
                  field="education"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={onSort}
                />
              </TableCell>
              <TableCell
                sx={[cvsStyles.tableHeadCell, cvsStyles.tableColEmployee]}
              >
                <SortHeader
                  label="Employee"
                  field="employee"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={onSort}
                />
              </TableCell>
              <TableCell
                sx={[cvsStyles.tableHeadCell, cvsStyles.tableColActions]}
              />
            </TableRow>
          </TableHead>

          <TableBody>
            {cvs.map((cv) => {
              const employee = cv.user?.email ?? "Unassigned";

              return (
                <Fragment key={cv.id}>
                  <TableRow sx={cvsStyles.tableDataRow}>
                    <TableCell sx={cvsStyles.tableColName}>
                      <CvNameCell cv={cv} />
                    </TableCell>
                    <TableCell sx={cvsStyles.tableColEducation}>
                      {cv.education ?? "—"}
                    </TableCell>
                    <TableCell sx={cvsStyles.tableColEmployee}>
                      <Typography sx={cvsStyles.tableEmployeeText}>
                        {employee}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={cvsStyles.tableColActions}>
                      <CvRowMenu
                        cv={cv}
                        showMenu={canManageCv(cv)}
                        onOpenMenu={onOpenMenu}
                      />
                    </TableCell>
                  </TableRow>
                  <CvDescriptionRow cv={cv} />
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={onCloseMenu}
        slotProps={{ paper: { sx: cvsStyles.contextMenuPaper } }}
      >
        <MenuItem
          component={NextLink}
          href={editHref}
          onClick={onCloseMenu}
          sx={cvsStyles.contextMenuItem}
        >
          Details
        </MenuItem>
        <MenuItem
          divider
          onClick={onDelete}
          sx={[cvsStyles.contextMenuItem, cvsStyles.menuItemDanger]}
        >
          Delete CV
        </MenuItem>
      </Menu>
    </>
  );
}

export default CvsTable;
