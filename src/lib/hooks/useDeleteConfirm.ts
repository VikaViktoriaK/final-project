import * as React from "react";

export function useDeleteConfirm<T>() {
  const [target, setTarget] = React.useState<T | null>(null);
  const [open, setOpen] = React.useState(false);

  const requestDelete = React.useCallback((row: T) => {
    setTarget(row);
    setOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

  const clearTarget = React.useCallback(() => {
    setTarget(null);
  }, []);

  return {
    target,
    open,
    requestDelete,
    close,
    clearTarget,
    setOpen,
  };
}
