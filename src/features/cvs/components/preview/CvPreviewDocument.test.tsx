import { screen } from "@testing-library/react";
import { mockCvWithProjects } from "../../test-utils/fixtures";
import { groupSkillsByCategory } from "../../shared/utils/group-skills";
import { renderWithTheme } from "../../test-utils/render-with-theme";
import CvPreviewDocument from "./CvPreviewDocument";

describe("CvPreviewDocument", () => {
  it("renders CV preview sections", () => {
    const grouped = groupSkillsByCategory(mockCvWithProjects.skills, []);

    renderWithTheme(
      <CvPreviewDocument cv={mockCvWithProjects} groupedSkills={grouped} />,
    );

    expect(
      screen.getByRole("heading", { name: "Jane Developer" }),
    ).toBeInTheDocument();
    expect(screen.getByText("BS Computer Science")).toBeInTheDocument();
    expect(screen.getByText("English — C1")).toBeInTheDocument();
    expect(screen.getByText("FinTech")).toBeInTheDocument();
    expect(screen.getByText("Alpha Portal")).toBeInTheDocument();
    expect(screen.getByText("Professional skills")).toBeInTheDocument();
  });
});
