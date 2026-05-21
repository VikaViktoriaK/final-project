import { fireEvent, render, screen } from "@testing-library/react";
import { UserSkillsCategories } from "./UserSkillsCategories";
import type { UserSkillCategory } from "@/features/users/types/userSkills.types";

describe("UserSkillsCategories", () => {
  const categories: UserSkillCategory[] = [
    {
      id: "frontend",
      title: "Frontend",
      skills: [
        {
          id: "react",
          name: "React",
          categoryId: "frontend",
          categoryName: "Frontend",
          mastery: "Advanced",
          progressColor: "#000",
        },
      ],
    },
  ];

  it("renders skill categories and management actions", () => {
    const onAdd = jest.fn();
    const onStartRemove = jest.fn();
    const onSkillClick = jest.fn();

    render(
      <UserSkillsCategories
        categories={categories}
        canManage
        hasSkills
        removeMode={false}
        selectedKeys={new Set()}
        selectedCount={0}
        onSkillClick={onSkillClick}
        onAdd={onAdd}
        onStartRemove={onStartRemove}
        onExitRemove={jest.fn()}
        onOpenBulkConfirm={jest.fn()}
      />,
    );

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /react/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /add skill/i }));
    fireEvent.click(screen.getByRole("button", { name: /remove skills/i }));
    fireEvent.click(screen.getByRole("button", { name: /react/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onStartRemove).toHaveBeenCalledTimes(1);
    expect(onSkillClick).toHaveBeenCalledWith(categories[0].skills[0]);
  });

  it("shows empty state and disables remove action without skills", () => {
    render(
      <UserSkillsCategories
        categories={[]}
        canManage
        hasSkills={false}
        removeMode={false}
        selectedKeys={new Set()}
        selectedCount={0}
        onSkillClick={jest.fn()}
        onAdd={jest.fn()}
        onStartRemove={jest.fn()}
        onExitRemove={jest.fn()}
        onOpenBulkConfirm={jest.fn()}
      />,
    );

    expect(screen.getByText("No skills listed yet.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /remove skills/i }),
    ).toBeDisabled();
  });

  it("enables bulk delete only when items are selected", () => {
    const onOpenBulkConfirm = jest.fn();

    render(
      <UserSkillsCategories
        categories={categories}
        canManage
        hasSkills
        removeMode
        selectedKeys={new Set(["react"])}
        selectedCount={1}
        onSkillClick={jest.fn()}
        onAdd={jest.fn()}
        onStartRemove={jest.fn()}
        onExitRemove={jest.fn()}
        onOpenBulkConfirm={onOpenBulkConfirm}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onOpenBulkConfirm).toHaveBeenCalledTimes(1);
  });
});
