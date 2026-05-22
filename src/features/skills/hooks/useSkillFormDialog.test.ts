import { act, renderHook } from "@testing-library/react";
import { TestProviders } from "@/features/auth/test-utils/render-with-theme";
import { useSkillFormDialog } from "./useSkillFormDialog";

const wrapper = TestProviders;

const categories = [
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
];

describe("useSkillFormDialog", () => {
  it("submits trimmed skill values in create mode", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(
      () =>
        useSkillFormDialog({
          mode: "create",
          skill: null,
          categories,
          onClose,
          onSubmit,
        }),
      { wrapper },
    );

    act(() => result.current.setName(" React "));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(onSubmit).toHaveBeenCalledWith({
      name: "React",
      categoryId: "frontend",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables confirm when edit form is unchanged", () => {
    const { result } = renderHook(
      () =>
        useSkillFormDialog({
          mode: "edit",
          skill: {
            id: "1",
            name: "React",
            categoryId: "frontend",
            categoryName: "Frontend",
          },
          categories,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
        }),
      { wrapper },
    );

    expect(result.current.confirmDisabled).toBe(true);
  });
});
