import { fireEvent, screen } from "@testing-library/react";
import { mockCvProject } from "../../test-utils/fixtures";
import { renderWithTheme } from "../../test-utils/render-with-theme";
import CvProjectCard from "./CvProjectCard";

describe("CvProjectCard", () => {
  it("renders project details and responsibilities", () => {
    renderWithTheme(
      <CvProjectCard
        project={mockCvProject}
        canEdit={false}
        onOpenMenu={jest.fn()}
      />,
    );

    expect(screen.getByText("Alpha Portal")).toBeInTheDocument();
    expect(screen.getByText("FinTech")).toBeInTheDocument();
    expect(screen.getByText("Implemented API layer")).toBeInTheDocument();
  });

  it("opens menu when editable", () => {
    const onOpenMenu = jest.fn();

    renderWithTheme(
      <CvProjectCard project={mockCvProject} canEdit onOpenMenu={onOpenMenu} />,
    );

    fireEvent.click(screen.getByLabelText("Project actions"));

    expect(onOpenMenu).toHaveBeenCalled();
  });

  it("hides menu button when read-only", () => {
    renderWithTheme(
      <CvProjectCard
        project={mockCvProject}
        canEdit={false}
        onOpenMenu={jest.fn()}
      />,
    );

    expect(screen.queryByLabelText("Project actions")).not.toBeInTheDocument();
  });
});
