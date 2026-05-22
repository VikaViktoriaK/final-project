import { fireEvent, screen } from "@testing-library/react";
import { mockCv } from "../../test-utils/fixtures";
import { renderWithTheme } from "../../test-utils/render-with-theme";
import CvsTable from "./CvsTable";

describe("CvsTable", () => {
  const onSort = jest.fn();
  const onOpenMenu = jest.fn();
  const onCloseMenu = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders CV rows and description", () => {
    renderWithTheme(
      <CvsTable
        cvs={[mockCv]}
        canManageCv={() => true}
        sortField="name"
        sortDirection="asc"
        onSort={onSort}
        menuAnchor={null}
        editHref="/cvs/cv-1/details"
        onOpenMenu={onOpenMenu}
        onCloseMenu={onCloseMenu}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText("Jane Developer")).toBeInTheDocument();
    expect(
      screen.getByText("Full-stack developer with five years of experience."),
    ).toBeInTheDocument();
    expect(screen.getByText("dev@example.com")).toBeInTheDocument();
  });

  it("calls onSort when header is clicked", () => {
    renderWithTheme(
      <CvsTable
        cvs={[mockCv]}
        canManageCv={() => false}
        sortField="name"
        sortDirection="asc"
        onSort={onSort}
        menuAnchor={null}
        editHref="#"
        onOpenMenu={onOpenMenu}
        onCloseMenu={onCloseMenu}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /name/i }));

    expect(onSort).toHaveBeenCalledWith("name");
  });

  it("shows row menu only when user can manage CV", () => {
    const { rerender } = renderWithTheme(
      <CvsTable
        cvs={[mockCv]}
        canManageCv={() => false}
        sortField="name"
        sortDirection="asc"
        onSort={onSort}
        menuAnchor={null}
        editHref="#"
        onOpenMenu={onOpenMenu}
        onCloseMenu={onCloseMenu}
        onDelete={onDelete}
      />,
    );

    expect(screen.queryByLabelText("CV actions")).not.toBeInTheDocument();

    rerender(
      <CvsTable
        cvs={[mockCv]}
        canManageCv={() => true}
        sortField="name"
        sortDirection="asc"
        onSort={onSort}
        menuAnchor={null}
        editHref="#"
        onOpenMenu={onOpenMenu}
        onCloseMenu={onCloseMenu}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText("CV actions"));

    expect(onOpenMenu).toHaveBeenCalled();
  });
});
