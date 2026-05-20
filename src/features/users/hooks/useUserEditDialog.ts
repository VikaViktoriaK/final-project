import * as React from "react";
import { useAuthSnapshot } from "@/features/auth/lib/auth-storage";
import {
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useUserEditOptionsQuery,
} from "@/features/users/api/updateUser";
import type { UserRow } from "@/features/users/types";
import {
  toUserEditFormState,
  type UserEditFormState,
} from "@/features/users/types/userEdit.types";
import { extractGraphqlErrorMessage } from "@/shared/utils/formatMutationError";

type UseUserEditDialogParams = {
  user: UserRow;
  onClose: () => void;
  onSaved: () => void;
};

export function useUserEditDialog({
  user,
  onClose,
  onSaved,
}: UseUserEditDialogParams) {
  const [form, setForm] = React.useState<UserEditFormState>(() =>
    toUserEditFormState(user),
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const [updateUser, { loading: updatingUser, error: updateUserError }] =
    useUpdateUserMutation();
  const [
    updateProfile,
    { loading: updatingProfile, error: updateProfileError },
  ] = useUpdateProfileMutation();
  const { data: optionsData, loading: loadingOptions } =
    useUserEditOptionsQuery();

  const { role } = useAuthSnapshot();
  const isAdmin = role === "Admin";

  const handleFieldChange =
    (key: keyof UserEditFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSave = React.useCallback(async () => {
    setSubmitError(null);

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();

    if (isAdmin) {
      const userUpdate: {
        userId: string;
        role?: string;
        departmentId?: string;
        positionId?: string;
      } = {
        userId: user.id,
        ...(form.departmentId ? { departmentId: form.departmentId } : {}),
        ...(form.positionId ? { positionId: form.positionId } : {}),
        role: form.role,
      };

      try {
        await updateUser({
          variables: { user: userUpdate },
        });
      } catch (e) {
        setSubmitError(`updateUser: ${extractGraphqlErrorMessage(e)}`);
        return;
      }
    }

    try {
      await updateProfile({
        variables: {
          profile: {
            userId: user.id,
            first_name: firstName || user.firstName,
            last_name: lastName || user.lastName,
          },
        },
      });
    } catch (e) {
      setSubmitError(`updateProfile: ${extractGraphqlErrorMessage(e)}`);
      return;
    }

    onSaved();
    onClose();
  }, [
    form.departmentId,
    form.firstName,
    form.lastName,
    form.positionId,
    form.role,
    isAdmin,
    onClose,
    onSaved,
    updateProfile,
    updateUser,
    user.firstName,
    user.id,
    user.lastName,
  ]);

  return {
    form,
    isAdmin,
    submitError,
    departments: optionsData?.departments ?? [],
    positions: optionsData?.positions ?? [],
    loading: updatingUser || updatingProfile || loadingOptions,
    mutationError: updateUserError ?? updateProfileError,
    handleFieldChange,
    handleSave,
  };
}
