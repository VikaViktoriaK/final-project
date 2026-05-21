import { fireEvent, render, screen } from "@testing-library/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { UsersTableRow } from "./UsersTableRow";
import type { UserRow } from "../types";

const user: UserRow = {
  id: "user-1",
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  department: "Engineering",
  position: "Developer",
};

describe("UsersTableRow", () => {
  beforeEach(() => {
    const payload = btoa(JSON.stringify({ role: "Admin", id: "admin-1" }));
    localStorage.setItem("hrm_access_token", `header.${payload}.signature`);
  });

  it("navigates to profile and opens admin menu actions", () => {
    const onView = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <Table>
        <TableBody>
          <UsersTableRow
            user={user}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TableBody>
      </Table>,
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(onView).toHaveBeenCalledWith(user);

    fireEvent.click(buttons[1]);
    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledWith(user);

    fireEvent.click(buttons[1]);
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledWith(user);
  });
});
