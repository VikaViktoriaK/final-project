import { fireEvent, render, screen } from "@testing-library/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import type { ReactElement } from "react";
import { PreferencesProvider } from "@/lib/preferences/PreferencesProvider";
import { DepartmentsTableRow } from "./DepartmentsTableRow";

function renderRow(ui: ReactElement) {
  return render(<PreferencesProvider>{ui}</PreferencesProvider>);
}

describe("DepartmentsTableRow", () => {
  const department = { id: "1", name: "Engineering" };

  it("renders department name without actions for read-only users", () => {
    renderRow(
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

    renderRow(
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
