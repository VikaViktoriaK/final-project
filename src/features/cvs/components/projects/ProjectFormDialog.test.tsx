import { screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import type { ProjectFormValues } from "../../projects/schemas/project-form.schema";
import { getProjectFormDefaults } from "../../projects/utils/project-form";
import { renderWithTheme } from "../../test-utils/render-with-theme";
import ProjectFormDialog from "./ProjectFormDialog";

function renderDialog(mode: "add" | "update" = "add") {
  function Host() {
    const { control, register, formState } = useForm<ProjectFormValues>({
      defaultValues: getProjectFormDefaults(mode),
    });

    return (
      <ProjectFormDialog
        open
        mode={mode}
        projects={[{ id: "proj-1", name: "Alpha Portal" } as never]}
        loading={false}
        isUpdateMode={mode === "update"}
        domainValue="FinTech"
        descriptionValue="Portal redesign"
        environmentValue="React, Node"
        control={control}
        register={register}
        errors={formState.errors}
        isSubmitting={false}
        canSubmit
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
  }

  return renderWithTheme(<Host />);
}

describe("ProjectFormDialog", () => {
  it("renders add project dialog", () => {
    renderDialog("add");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Add project")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeEnabled();
    expect(screen.getByDisplayValue("FinTech")).toBeInTheDocument();
  });

  it("renders update project dialog", () => {
    renderDialog("update");

    expect(screen.getByText("Update project")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });
});
