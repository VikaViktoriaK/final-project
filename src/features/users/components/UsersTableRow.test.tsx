import { fireEvent, screen } from "@testing-library/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
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
  it("navigates to profile and opens admin menu actions", () => {
    const onView = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    renderWithTheme(
      <Table>
        <TableBody>
          <UsersTableRow
            user={user}
            isAdmin
            canEdit
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
