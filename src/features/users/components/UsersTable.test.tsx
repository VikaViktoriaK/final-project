import { render, screen } from "@testing-library/react";
import { UsersTable } from "./UsersTable";

jest.mock("./UsersTableRow", () => ({
  UsersTableRow: ({ user }: { user: { firstName: string } }) => (
    <tr>
      <td>{user.firstName}</td>
    </tr>
  ),
}));

describe("UsersTable", () => {
  it("renders empty state when there are no users", () => {
    render(
      <UsersTable
        users={[]}
        onEditUser={jest.fn()}
        onViewUser={jest.fn()}
        onDeleteUser={jest.fn()}
      />,
    );

    expect(screen.getByText("Users not found")).toBeInTheDocument();
  });

  it("renders user rows", () => {
    render(
      <UsersTable
        users={[
          {
            id: "1",
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
            department: "Engineering",
            position: "Developer",
          },
        ]}
        onEditUser={jest.fn()}
        onViewUser={jest.fn()}
        onDeleteUser={jest.fn()}
      />,
    );

    expect(screen.getByText("Ada")).toBeInTheDocument();
  });
});
