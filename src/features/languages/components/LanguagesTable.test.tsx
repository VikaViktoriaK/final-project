import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { LanguagesTable } from "./LanguagesTable";

describe("LanguagesTable", () => {
  it("renders languages and empty state", () => {
    const { rerender } = renderWithTheme(
      <LanguagesTable
        languages={[
          { id: "1", name: "English", nativeName: "English", iso2: "EN" },
        ]}
        order="asc"
        orderBy="name"
        onSort={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        canManage
      />,
    );

    expect(screen.getAllByText("English")).toHaveLength(2);

    rerender(
      <LanguagesTable
        languages={[]}
        order="asc"
        orderBy="name"
        onSort={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        canManage={false}
      />,
    );
    expect(screen.getByText("Languages not found")).toBeInTheDocument();
  });
});
