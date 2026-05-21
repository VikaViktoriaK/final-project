import { fireEvent, render, screen } from "@testing-library/react";
import { DepartmentsTable } from "./DepartmentsTable";

describe("DepartmentsTable", () => {
  it("renders empty state", () => {
    render(
      <DepartmentsTable
        departments={[]}
        order="asc"
        onSort={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        canManage={false}
      />,
    );

    expect(screen.getByText("Departments not found")).toBeInTheDocument();
  });

  it("sorts when header is clicked", () => {
    const onSort = jest.fn();
    render(
      <DepartmentsTable
        departments={[{ id: "1", name: "Engineering" }]}
        order="asc"
        onSort={onSort}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        canManage
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /name/i }));
    expect(onSort).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });
});
