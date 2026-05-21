import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import CatalogProjectFormDialog from "./catalog-project-form-dialog";
import type { CatalogProjectFormValues } from "../schemas";

function TestHarness({
  mode = "create" as const,
  canSubmit = true,
  onClose = jest.fn(),
  onSubmit = jest.fn(),
}) {
  const { control, register, handleSubmit } = useForm<CatalogProjectFormValues>(
    {
      defaultValues: {
        name: "HRM App",
        domain: "HR",
        startDate: "2024-01-01",
        endDate: "",
        description: "Employee management",
        environment: ["React"],
      },
    },
  );

  return (
    <CatalogProjectFormDialog
      open
      mode={mode}
      control={control}
      register={register}
      errors={{}}
      skills={[
        {
          id: "1",
          name: "React",
          category: { id: "frontend", name: "Frontend", parent: null },
        },
      ]}
      isSubmitting={false}
      canSubmit={canSubmit}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

describe("CatalogProjectFormDialog", () => {
  it("renders create dialog fields and actions", () => {
    render(<TestHarness />);

    expect(screen.getByText("Create project")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("HRM App");
    expect(screen.getByRole("button", { name: "Create" })).toBeEnabled();
  });

  it("renders update labels and calls close handler", () => {
    const onClose = jest.fn();
    render(<TestHarness mode="update" onClose={onClose} />);

    expect(screen.getByText("Update project")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("disables submit when form cannot be submitted", () => {
    render(<TestHarness canSubmit={false} />);
    expect(screen.getByRole("button", { name: "Create" })).toBeDisabled();
  });
});
