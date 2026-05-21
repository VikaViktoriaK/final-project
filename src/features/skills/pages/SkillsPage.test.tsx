import { render, screen } from "@testing-library/react";
import { SkillsPage } from "./SkillsPage";

jest.mock("../hooks/useSkillsPage", () => ({
  useSkillsPage: jest.fn(),
}));

const { useSkillsPage } = jest.requireMock("../hooks/useSkillsPage");

describe("SkillsPage", () => {
  it("renders skills table and category column", () => {
    useSkillsPage.mockReturnValue({
      isAdmin: true,
      loading: false,
      error: null,
      query: "",
      setQuery: jest.fn(),
      orderBy: "name",
      order: "asc",
      handleSort: jest.fn(),
      form: {
        open: false,
        mode: "create",
        item: null,
        openCreate: jest.fn(),
        openEdit: jest.fn(),
        close: jest.fn(),
      },
      deleteDialog: {
        open: false,
        target: null,
        requestDelete: jest.fn(),
        close: jest.fn(),
      },
      categories: [{ id: "frontend", name: "Frontend" }],
      processedSkills: [
        {
          id: "1",
          name: "React",
          categoryId: "frontend",
          categoryName: "Frontend",
        },
      ],
      saving: false,
      deleting: false,
      handleFormSubmit: jest.fn(),
      handleDeleteConfirm: jest.fn(),
    });

    render(<SkillsPage />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });
});
