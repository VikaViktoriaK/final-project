import { render, screen } from "@testing-library/react";
import { PositionsPage } from "./PositionsPage";

jest.mock("../hooks/usePositionsPage", () => ({
  usePositionsPage: jest.fn(),
}));

const { usePositionsPage } = jest.requireMock("../hooks/usePositionsPage");

describe("PositionsPage", () => {
  it("renders positions table", () => {
    usePositionsPage.mockReturnValue({
      isAdmin: false,
      loading: false,
      error: null,
      search: {
        query: "",
        setQuery: jest.fn(),
        order: "asc",
        toggleOrder: jest.fn(),
      },
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
      processedPositions: [{ id: "1", name: "Developer" }],
      saving: false,
      deleting: false,
      handleFormSubmit: jest.fn(),
      handleDeleteConfirm: jest.fn(),
    });

    render(<PositionsPage />);
    expect(screen.getByText("Positions")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });
});
