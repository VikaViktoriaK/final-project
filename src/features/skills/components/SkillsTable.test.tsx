import { render, screen } from "@testing-library/react";
import { SkillsTable } from "./SkillsTable";

describe("SkillsTable", () => {
  it("renders skills table and empty state", () => {
    const { rerender } = render(
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
