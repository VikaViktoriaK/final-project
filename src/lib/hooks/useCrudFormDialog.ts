import * as React from "react";

export type CrudFormMode = "create" | "edit";

export function useCrudFormDialog<T>() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<CrudFormMode>("create");
  const [item, setItem] = React.useState<T | null>(null);

  const openCreate = React.useCallback(() => {
    setMode("create");
    setItem(null);
    setOpen(true);
  }, []);

  const openEdit = React.useCallback((row: T) => {
    setMode("edit");
    setItem(row);
    setOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    mode,
    item,
    openCreate,
    openEdit,
    close,
    setOpen,
  };
}
