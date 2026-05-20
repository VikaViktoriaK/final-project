import type { ChangeEvent, ReactNode } from "react";
import type { ProjectGridSortField } from "@/lib/project-grid-sort";
import type { SortDirection } from "@/lib/sort";

type SearchFieldProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  compact?: boolean;
};

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

type ConfirmHighlightProps = {
  children: ReactNode;
};

type SortableProjectsHeaderProps = {
  sortField: ProjectGridSortField;
  sortDirection: SortDirection;
  onSort: (field: ProjectGridSortField) => void;
};

type ProjectSortColumnProps = {
  label: string;
  field: ProjectGridSortField;
  sortField: ProjectGridSortField;
  sortDirection: SortDirection;
  onSort: (field: ProjectGridSortField) => void;
};

export type {
  SearchFieldProps,
  ConfirmDialogProps,
  ConfirmHighlightProps,
  SortableProjectsHeaderProps,
  ProjectSortColumnProps,
};
