import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { DepartmentFormDialog } from "./DepartmentFormDialog";

describe("DepartmentFormDialog", () => {
  it("submits trimmed department name and closes after success", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    renderWithTheme(
      <DepartmentFormDialog
        open
        mode="create"
        department={null}
        saving={false}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "  Engineering  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith("Engineering"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables update when edit form is unchanged", () => {
    renderWithTheme(
      <DepartmentFormDialog
        open
        mode="edit"
        department={{ id: "1", name: "Engineering" }}
        saving={false}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Update" })).toBeDisabled();
  });

  it("disables create when the name is empty", () => {
    renderWithTheme(
      <DepartmentFormDialog
        open
        mode="create"
        department={null}
        saving={false}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Create" })).toBeDisabled();
  });
});
