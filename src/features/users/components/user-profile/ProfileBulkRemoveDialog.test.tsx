import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProfileBulkRemoveDialog } from "./ProfileBulkRemoveDialog";

describe("ProfileBulkRemoveDialog", () => {
  it("renders message and confirms deletion", async () => {
    const onConfirm = jest.fn().mockResolvedValue(undefined);
    const onClose = jest.fn();

    render(
      <ProfileBulkRemoveDialog
        open
        title="Remove languages"
        cancelLabel="Cancel"
        deleteLabel="Delete"
        message="Remove selected languages?"
        submitting={false}
        errorMessage={null}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.getByText("Remove selected languages?")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    await waitFor(() => expect(onConfirm).toHaveBeenCalledTimes(1));
  });

  it("shows error and blocks close while submitting", () => {
    render(
      <ProfileBulkRemoveDialog
        open
        title="Remove skills"
        cancelLabel="Cancel"
        deleteLabel="Delete"
        message="Remove selected skills?"
        submitting
        errorMessage="Failed to remove"
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />,
    );

    expect(screen.getByText("Failed to remove")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
  });
});
