import { fireEvent, render, screen } from "@testing-library/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SortableTableHeader } from "./SortableTableHeader";

describe("SortableTableHeader", () => {
  it("calls onSort with the configured field", () => {
    const onSort = jest.fn();

    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <SortableTableHeader
                label="Name"
                field="name"
                sortField="name"
                sortDirection="asc"
                onSort={onSort}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody />
      </Table>,
    );

    fireEvent.click(screen.getByRole("button", { name: /name/i }));
    expect(onSort).toHaveBeenCalledWith("name");
  });
});
