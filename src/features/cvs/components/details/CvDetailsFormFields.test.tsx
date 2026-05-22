import { screen } from "@testing-library/react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import CvDetailsFormFields from "./CvDetailsFormFields";
import type { CreateCvFormValues } from "../../list/schemas/create-cv.schema";
import { renderWithTheme } from "../../test-utils/render-with-theme";

const register = jest.fn() as unknown as UseFormRegister<CreateCvFormValues>;

describe("CvDetailsFormFields", () => {
  it("renders CV form fields", () => {
    renderWithTheme(<CvDetailsFormFields register={register} errors={{}} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Education")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("shows validation messages", () => {
    const errors = {
      name: { message: "Name is required", type: "required" },
    } as FieldErrors<CreateCvFormValues>;

    renderWithTheme(
      <CvDetailsFormFields register={register} errors={errors} />,
    );

    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("disables fields when read-only", () => {
    renderWithTheme(
      <CvDetailsFormFields register={register} errors={{}} disabled />,
    );

    expect(screen.getByLabelText("Name")).toBeDisabled();
  });
});
