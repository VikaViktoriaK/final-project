import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { PositionsTable } from "./PositionsTable";

describe("PositionsTable", () => {
  it("renders positions and supports sort clicks", () => {
    const onSort = jest.fn();
    renderWithTheme(
      <PositionsTable
        positions={[{ id: "1", name: "Developer" }]}
        order="asc"
        onSort={onSort}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        canManage
      />,
    );

    expect(screen.getByText("Developer")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /name/i }));
    expect(onSort).toHaveBeenCalledTimes(1);
  });
});
