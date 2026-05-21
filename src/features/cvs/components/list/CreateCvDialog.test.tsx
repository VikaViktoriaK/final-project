import { screen } from "@testing-library/react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import CreateCvDialog from "./CreateCvDialog";
import type { CreateCvFormValues } from "../../list/schemas/create-cv.schema";
import { renderWithTheme } from "../../test-utils/render-with-theme";

const register = jest.fn() as unknown as UseFormRegister<CreateCvFormValues>;
const errors = {} as FieldErrors<CreateCvFormValues>;

describe("CreateCvDialog", () => {
  it("renders create dialog when open", () => {
    renderWithTheme(
      <CreateCvDialog
        open
        onClose={jest.fn()}
        register={register}
        errors={errors}
        isPending={false}
        hasChanges
        canCreate
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Create CV")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeEnabled();
  });

  it("shows error message and disables create when not allowed", () => {
    renderWithTheme(
      <CreateCvDialog
        open
        onClose={jest.fn()}
        register={register}
        errors={errors}
        isPending={false}
        hasChanges={false}
        canCreate={false}
        errorMessage="Failed to create CV"
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByText("Failed to create CV")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeDisabled();
  });

  it("calls onClose when cancel is clicked", async () => {
    const onClose = jest.fn();
    const { user } = renderWithTheme(
      <CreateCvDialog
        open
        onClose={onClose}
        register={register}
        errors={errors}
        isPending={false}
        hasChanges
        canCreate
        onSubmit={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalled();
  });
});
