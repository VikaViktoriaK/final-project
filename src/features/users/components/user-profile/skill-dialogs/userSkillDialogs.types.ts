import type {
  ProfileSkillRow,
  UserSkill,
} from "@/features/users/types/userSkills.types";

export type AddUserSkillDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  currentSkills: ProfileSkillRow[];
  onCompleted: () => Promise<unknown> | void;
};

export type UpdateUserSkillDialogProps = {
  open: boolean;
  onClose: () => void;
  userId: string;
  skill: UserSkill | null;
  onCompleted: () => Promise<unknown> | void;
};

export type ConfirmBulkRemoveSkillsDialogProps = {
  open: boolean;
  selectedCount: number;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  submitting: boolean;
  errorMessage: string | null;
};
