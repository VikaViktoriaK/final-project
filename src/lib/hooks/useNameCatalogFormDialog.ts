import * as React from "react";
import { formatMutationError } from "@/shared/utils/formatMutationError";

type CatalogFormLabels = {
  title: string;
  nameLabel: string;
  cancel: string;
  confirm: string;
};

type UseNameCatalogFormDialogParams = {
  mode: "create" | "edit";
  currentName?: string;
  createLabels: CatalogFormLabels;
  editLabels: CatalogFormLabels;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
};

export function useNameCatalogFormDialog({
  mode,
  currentName = "",
  createLabels,
  editLabels,
  onClose,
  onSubmit,
}: UseNameCatalogFormDialogParams) {
  const labels = mode === "create" ? createLabels : editLabels;
  const [name, setName] = React.useState(() =>
    mode === "edit" ? currentName : "",
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const trimmedName = name.trim();
  const unchanged = mode === "edit" && trimmedName === currentName.trim();
  const confirmDisabled = !trimmedName || unchanged;

  const handleSubmit = React.useCallback(async () => {
    if (!trimmedName) {
      setSubmitError("Enter a name.");
      return;
    }
    if (unchanged) {
      onClose();
      return;
    }
    setSubmitError(null);
    try {
      await onSubmit(trimmedName);
      onClose();
    } catch (err) {
      setSubmitError(formatMutationError(err));
    }
  }, [onClose, onSubmit, trimmedName, unchanged]);

  return {
    labels,
    name,
    setName,
    submitError,
    confirmDisabled,
    handleSubmit,
  };
}
