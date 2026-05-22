import { fireEvent, render, screen } from "@testing-library/react";
import { UserSkillCard } from "./UserSkillCard";

describe("UserSkillCard", () => {
  const skill = {
    id: "react",
    name: "React",
    categoryId: "frontend",
    categoryName: "Frontend",
    mastery: "Advanced",
    progressColor: "#42a5f5",
  };

  it("renders skill name and handles click", () => {
    const onClick = jest.fn();
    render(<UserSkillCard skill={skill} onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: /react/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("marks selected cards as pressed", () => {
    render(<UserSkillCard skill={skill} selected onClick={jest.fn()} />);
    expect(screen.getByRole("button", { name: /react/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
