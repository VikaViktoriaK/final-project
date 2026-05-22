import { fireEvent, screen } from "@testing-library/react";
import CvSkillRow from "./CvSkillRow";
import { mockSkill } from "../../test-utils/fixtures";
import { renderWithTheme } from "../../test-utils/render-with-theme";

describe("CvSkillRow", () => {
  it("toggles selection in remove mode", () => {
    const onToggle = jest.fn();

    renderWithTheme(
      <CvSkillRow
        skill={mockSkill}
        removeMode
        editable={false}
        selected={false}
        onToggle={onToggle}
        onEdit={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onToggle).toHaveBeenCalledWith("React");
  });

  it("opens edit flow when editable", () => {
    const onEdit = jest.fn();

    renderWithTheme(
      <CvSkillRow
        skill={mockSkill}
        removeMode={false}
        editable
        selected={false}
        onToggle={jest.fn()}
        onEdit={onEdit}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onEdit).toHaveBeenCalledWith(mockSkill);
  });

  it("is not interactive when read-only", () => {
    renderWithTheme(
      <CvSkillRow
        skill={mockSkill}
        removeMode={false}
        editable={false}
        selected={false}
        onToggle={jest.fn()}
        onEdit={jest.fn()}
      />,
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
