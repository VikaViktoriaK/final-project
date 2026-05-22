import { fireEvent, render, screen } from "@testing-library/react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

describe("ConfirmDeleteDialog", () => {
  it("renders content and calls close or confirm actions", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <ConfirmDeleteDialog
        open
        title="Delete department"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        deleting={false}
        canConfirm
        onClose={onClose}
        onConfirm={onConfirm}
      >
        <p>Delete Engineering?</p>
      </ConfirmDeleteDialog>,
    );

    expect(screen.getByText("Delete Engineering?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("disables confirm while deleting or when confirmation is unavailable", () => {
    const { rerender } = render(
      <ConfirmDeleteDialog
        open
        title="Delete skill"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        deleting={false}
        canConfirm={false}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      >
        <p>Delete React?</p>
      </ConfirmDeleteDialog>,
    );

    expect(screen.getByRole("button", { name: "Delete" })).toBeDisabled();

    rerender(
      <ConfirmDeleteDialog
        open
        title="Delete skill"
        cancelLabel="Cancel"
        confirmLabel="Delete"
        deleting
        canConfirm
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      >
        <p>Delete React?</p>
      </ConfirmDeleteDialog>,
    );

    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Delete" })).toBeDisabled();
  });
});
