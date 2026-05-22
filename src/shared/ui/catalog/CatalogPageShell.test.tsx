import { fireEvent, screen } from "@testing-library/react";
import Button from "@mui/material/Button";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { CatalogPageShell } from "./CatalogPageShell";

describe("CatalogPageShell", () => {
  it("renders title, search, filter, action, and children", () => {
    const onSearchChange = jest.fn();

    renderWithTheme(
      <CatalogPageShell
        title="Departments"
        searchQuery=""
        onSearchChange={onSearchChange}
        filter={<span>Only active</span>}
        action={<Button>Create</Button>}
        loading={false}
      >
        <div>Table content</div>
      </CatalogPageShell>,
    );

    expect(screen.getByText("Departments")).toBeInTheDocument();
    expect(screen.getByText("Only active")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
    expect(screen.getByText("Table content")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "eng" },
    });
    expect(onSearchChange).toHaveBeenCalledWith("eng");
  });

  it("shows error and loader state", () => {
    renderWithTheme(
      <CatalogPageShell
        title="Languages"
        searchQuery=""
        onSearchChange={jest.fn()}
        errorMessage="Failed to load"
        loading
      >
        <div>Hidden content</div>
      </CatalogPageShell>,
    );

    expect(screen.getByText("Failed to load")).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });
});
