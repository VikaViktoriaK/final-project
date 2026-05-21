import { fireEvent, render, screen } from "@testing-library/react";
import { DepartmentsPage } from "./DepartmentsPage";

jest.mock("../hooks/useDepartmentsPage", () => ({
  useDepartmentsPage: jest.fn(),
}));

const { useDepartmentsPage } = jest.requireMock("../hooks/useDepartmentsPage");

describe("DepartmentsPage", () => {
  it("renders admin create action and department rows", () => {
    const openCreate = jest.fn();
    useDepartmentsPage.mockReturnValue({
      isAdmin: true,
      loading: false,
      error: null,
      search: {
        query: "",
        setQuery: jest.fn(),
        order: "asc",
        toggleOrder: jest.fn(),
      },
      form: {
        open: false,
        mode: "create",
        item: null,
        openCreate,
        openEdit: jest.fn(),
        close: jest.fn(),
      },
      deleteDialog: {
        open: false,
        target: null,
        requestDelete: jest.fn(),
        close: jest.fn(),
      },
      processedDepartments: [{ id: "1", name: "Engineering" }],
      saving: false,
      deleting: false,
      handleFormSubmit: jest.fn(),
      handleDeleteConfirm: jest.fn(),
    });

    render(<DepartmentsPage />);

    expect(screen.getByText("Departments")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /create department/i }));
    expect(openCreate).toHaveBeenCalledTimes(1);
  });
});
