import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { SkillsTable } from "./SkillsTable";

describe("SkillsTable", () => {
  it("renders skills table and empty state", () => {
    const { rerender } = renderWithTheme(
      <SkillsTable
        skills={[
          {
            id: "1",
            name: "React",
            categoryId: "frontend",
            categoryName: "Frontend",
          },
        ]}
        order="asc"
        orderBy="name"
        onSort={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        canManage
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();

    rerender(
      <SkillsTable
        skills={[]}
        order="asc"
        orderBy="name"
        onSort={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        canManage={false}
      />,
    );
    expect(screen.getByText("Skills not found")).toBeInTheDocument();
  });
});
