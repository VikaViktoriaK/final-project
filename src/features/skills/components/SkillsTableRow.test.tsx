import { fireEvent, render, screen } from "@testing-library/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { SkillsTableRow } from "./SkillsTableRow";

describe("SkillsTableRow", () => {
  const skill = {
    id: "1",
    name: "React",
    categoryId: "frontend",
    categoryName: "Frontend",
  };

  it("renders skill data and delete action", () => {
    const onDelete = jest.fn();
    render(
      <Table>
        <TableBody>
          <SkillsTableRow
            skill={skill}
            onEdit={jest.fn()}
            onDelete={onDelete}
            canManage
          />
        </TableBody>
      </Table>,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /actions for react/i }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledWith(skill);
  });
});
