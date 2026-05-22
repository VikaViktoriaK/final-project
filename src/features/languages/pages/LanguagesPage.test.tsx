import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { LanguagesPage } from "./LanguagesPage";

jest.mock("../hooks/useLanguagesPage", () => ({
  useLanguagesPage: jest.fn(),
}));

const { useLanguagesPage } = jest.requireMock("../hooks/useLanguagesPage");

describe("LanguagesPage", () => {
  it("renders languages table for admin users", () => {
    useLanguagesPage.mockReturnValue({
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
      processedLanguages: [
        { id: "1", name: "English", nativeName: "English", iso2: "EN" },
      ],
      saving: false,
      deleting: false,
      handleFormSubmit: jest.fn(),
      handleDeleteConfirm: jest.fn(),
    });

    renderWithTheme(<LanguagesPage />);
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getAllByText("English").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /create language/i }),
    ).toBeInTheDocument();
  });
});
