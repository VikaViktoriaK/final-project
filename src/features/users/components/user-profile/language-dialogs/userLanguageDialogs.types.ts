import type { UserLanguageRow } from "@/features/users/types/userLanguages.types";

export type AddUserLanguageDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  currentLanguages: UserLanguageRow[];
  onCompleted: () => Promise<unknown> | void;
};

export type UpdateUserLanguageDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  language: UserLanguageRow | null;
  onCompleted: () => Promise<unknown> | void;
};

export type ConfirmBulkRemoveLanguagesDialogProps = {
  open: boolean;
  selectedCount: number;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  submitting: boolean;
  errorMessage: string | null;
};
