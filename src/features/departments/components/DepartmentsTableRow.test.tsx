import { fireEvent, render, screen } from "@testing-library/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { DepartmentsTableRow } from "./DepartmentsTableRow";

describe("DepartmentsTableRow", () => {
  const department = { id: "1", name: "Engineering" };

  it("renders department name without actions for read-only users", () => {
    render(
      <Table>
        <TableBody>
          <DepartmentsTableRow
            department={department}
            onEdit={jest.fn()}
            onDelete={jest.fn()}
            canManage={false}
          />
        </TableBody>
      </Table>,
    );

    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /actions for engineering/i }),
    ).not.toBeInTheDocument();
  });

  it("calls edit and delete handlers from row menu", () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <Table>
        <TableBody>
          <DepartmentsTableRow
            department={department}
            onEdit={onEdit}
            onDelete={onDelete}
            canManage
          />
        </TableBody>
      </Table>,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /actions for engineering/i }),
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledWith(department);

    fireEvent.click(
      screen.getByRole("button", { name: /actions for engineering/i }),
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledWith(department);
  });
});
