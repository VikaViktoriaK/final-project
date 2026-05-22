import { fireEvent, screen } from "@testing-library/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { LanguagesTableRow } from "./LanguagesTableRow";

describe("LanguagesTableRow", () => {
  const language = {
    id: "1",
    name: "English",
    nativeName: "English",
    iso2: "EN",
  };

  it("renders language columns and menu actions", () => {
    const onEdit = jest.fn();
    renderWithTheme(
      <Table>
        <TableBody>
          <LanguagesTableRow
            language={language}
            onEdit={onEdit}
            onDelete={jest.fn()}
            canManage
          />
        </TableBody>
      </Table>,
    );

    expect(screen.getAllByText("English")).toHaveLength(2);
    expect(screen.getByText("EN")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /actions for english/i }),
    );
    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledWith(language);
  });
});
