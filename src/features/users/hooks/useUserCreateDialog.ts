import * as React from "react";
import { useCreateUserMutation } from "@/features/users/api/createUser";
import { useUserEditOptionsQuery } from "@/features/users/api/updateUser";
import {
  createUserSchema,
  type CreateUserFieldErrors,
} from "@/features/users/schemas/createUser.schema";
import {
  DEFAULT_USER_CREATE_FORM,
  type UserCreateFormState,
} from "@/features/users/types/userCreate.types";

type UseUserCreateDialogParams = {
  onClose: () => void;
  onCreated: () => void;
};

export function useUserCreateDialog({
  onClose,
  onCreated,
}: UseUserCreateDialogParams) {
  const [form, setForm] = React.useState<UserCreateFormState>(
    DEFAULT_USER_CREATE_FORM,
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<CreateUserFieldErrors>(
    {},
  );
  const [createUser, { loading, error }] = useCreateUserMutation();
  const { data: optionsData, loading: loadingOptions } =
    useUserEditOptionsQuery();

  const handleField =
    (key: keyof UserCreateFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (
        key === "email" ||
        key === "password" ||
        key === "firstName" ||
        key === "lastName"
      ) {
        setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const handleSubmit = React.useCallback(async () => {
    const validation = createUserSchema.safeParse({
      email: form.email.trim(),
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    });

    if (!validation.success) {
      const flattened = validation.error.flatten().fieldErrors;
      setFieldErrors({
        email: flattened.email?.[0],
        password: flattened.password?.[0],
        firstName: flattened.firstName?.[0],
        lastName: flattened.lastName?.[0],
      });
      setSubmitError(null);
      return;
    }

    setFieldErrors({});
    setSubmitError(null);

    try {
      await createUser({
        variables: {
          user: {
            auth: {
              email: form.email.trim(),
              password: form.password,
            },
            profile: {
              ...(form.firstName.trim()
                ? { first_name: form.firstName.trim() }
                : {}),
              ...(form.lastName.trim()
                ? { last_name: form.lastName.trim() }
                : {}),
            },
            cvsIds: [],
            role: form.role,
            ...(form.departmentId ? { departmentId: form.departmentId } : {}),
            ...(form.positionId ? { positionId: form.positionId } : {}),
          },
        },
      });

      onCreated();
      onClose();
    } catch {
      setSubmitError("Failed to create user");
    }
  }, [createUser, form, onClose, onCreated]);

  return {
    form,
    submitError,
    fieldErrors,
    mutationError: error,
    departments: optionsData?.departments ?? [],
    positions: optionsData?.positions ?? [],
    roleOptions: ["Employee", "Admin"] as const,
    isBusy: loading || loadingOptions,
    handleField,
    handleSubmit,
  };
}
