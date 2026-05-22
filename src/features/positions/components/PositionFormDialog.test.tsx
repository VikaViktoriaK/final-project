import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { PositionFormDialog } from "./PositionFormDialog";

describe("PositionFormDialog", () => {
  it("submits trimmed position name and closes after success", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    renderWithTheme(
      <PositionFormDialog
        open
        mode="create"
        position={null}
        saving={false}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "  Developer  " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith("Developer"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables update when edit form is unchanged", () => {
    renderWithTheme(
      <PositionFormDialog
        open
        mode="edit"
        position={{ id: "1", name: "Developer" }}
        saving={false}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Update" })).toBeDisabled();
  });
});
