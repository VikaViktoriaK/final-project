import { act, renderHook } from "@testing-library/react";
import { useNameCatalogFormDialog } from "./useNameCatalogFormDialog";

const labels = {
  create: {
    title: "Create",
    nameLabel: "Name",
    cancel: "Cancel",
    confirm: "Create",
  },
  edit: {
    title: "Edit",
    nameLabel: "Name",
    cancel: "Cancel",
    confirm: "Update",
  },
};

describe("useNameCatalogFormDialog", () => {
  it("submits trimmed name in create mode", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useNameCatalogFormDialog({
        mode: "create",
        createLabels: labels.create,
        editLabels: labels.edit,
        onClose,
        onSubmit,
      }),
    );

    act(() => result.current.setName("  Engineering  "));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(onSubmit).toHaveBeenCalledWith("Engineering");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables confirm when edit form is unchanged", () => {
    const { result } = renderHook(() =>
      useNameCatalogFormDialog({
        mode: "edit",
        currentName: "Engineering",
        createLabels: labels.create,
        editLabels: labels.edit,
        onClose: jest.fn(),
        onSubmit: jest.fn(),
      }),
    );

    expect(result.current.confirmDisabled).toBe(true);
  });
});
