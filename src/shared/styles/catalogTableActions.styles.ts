import { catalogTableHeadSx } from "./catalogTableHead.styles";

/** Fixed width for ⋯ menu column on catalog tables (skills, languages, departments, positions, users). */
export const CATALOG_TABLE_ACTIONS_COL_WIDTH = 56;

export const catalogTableActionsSx = {
  colWidth: CATALOG_TABLE_ACTIONS_COL_WIDTH,
  headCell: {
    ...catalogTableHeadSx.headCell,
    width: CATALOG_TABLE_ACTIONS_COL_WIDTH,
    minWidth: CATALOG_TABLE_ACTIONS_COL_WIDTH,
    maxWidth: CATALOG_TABLE_ACTIONS_COL_WIDTH,
    textAlign: "right",
    verticalAlign: "middle",
    pr: 2,
    pl: 0,
  },
  cell: {
    width: CATALOG_TABLE_ACTIONS_COL_WIDTH,
    minWidth: CATALOG_TABLE_ACTIONS_COL_WIDTH,
    maxWidth: CATALOG_TABLE_ACTIONS_COL_WIDTH,
    textAlign: "right",
    verticalAlign: "middle",
    pr: 2,
    pl: 0,
    whiteSpace: "nowrap",
  },
  menuButton: {
    color: "var(--app-text-muted)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.06)",
    },
  },
} as const;
