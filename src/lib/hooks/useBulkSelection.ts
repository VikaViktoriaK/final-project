import * as React from "react";

export function useBulkSelection<T>(getKey: (item: T) => string) {
  const [removeMode, setRemoveMode] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(
    () => new Set<string>(),
  );
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const exitRemoveMode = React.useCallback(() => {
    setRemoveMode(false);
    setSelectedKeys(new Set());
    setConfirmOpen(false);
    setError(null);
  }, []);

  const toggleSelected = React.useCallback(
    (item: T) => {
      const key = getKey(item);
      setSelectedKeys((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return next;
      });
    },
    [getKey],
  );

  const startRemoveMode = React.useCallback(() => {
    setRemoveMode(true);
    setSelectedKeys(new Set());
  }, []);

  return {
    removeMode,
    setRemoveMode,
    selectedKeys,
    selectedCount: selectedKeys.size,
    confirmOpen,
    setConfirmOpen,
    error,
    setError,
    submitting,
    setSubmitting,
    exitRemoveMode,
    toggleSelected,
    startRemoveMode,
  };
}
