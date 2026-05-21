import { fireEvent, render, screen } from "@testing-library/react";
import { CatalogFormDialogActions } from "./CatalogFormDialogActions";

describe("CatalogFormDialogActions", () => {
  it("calls close and confirm handlers", () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();

    render(
      <CatalogFormDialogActions
        cancelLabel="Cancel"
        confirmLabel="Create"
        saving={false}
        confirmDisabled={false}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("disables actions according to saving and validation state", () => {
    render(
      <CatalogFormDialogActions
        cancelLabel="Cancel"
        confirmLabel="Create"
        saving
        confirmDisabled
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Create" })).toBeDisabled();
  });
});
