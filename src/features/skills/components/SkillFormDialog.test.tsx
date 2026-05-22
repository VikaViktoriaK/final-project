import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { SkillFormDialog } from "./SkillFormDialog";

describe("SkillFormDialog", () => {
  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
  ];

  it("submits the skill name with the default category", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    renderWithTheme(
      <SkillFormDialog
        open
        mode="create"
        skill={null}
        categories={categories}
        saving={false}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("Skill name"), {
      target: { value: " React " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: "React",
        categoryId: "frontend",
      }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables submit when there are no categories", () => {
    renderWithTheme(
      <SkillFormDialog
        open
        mode="create"
        skill={null}
        categories={[]}
        saving={false}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Create" })).toBeDisabled();
  });

  it("disables update when edit form is unchanged", () => {
    renderWithTheme(
      <SkillFormDialog
        open
        mode="edit"
        skill={{
          id: "1",
          name: "React",
          categoryId: "frontend",
          categoryName: "Frontend",
        }}
        categories={categories}
        saving={false}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Update" })).toBeDisabled();
  });
});
