import { render, screen } from "@testing-library/react";
import { mockCv } from "../../test-utils/fixtures";
import useCv from "../hooks/use-cv";
import { canManageCv } from "../utils/cv-permissions";
import { CvProvider, useCvContext } from "./cv-context";

jest.mock("../hooks/use-cv", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../utils/cv-permissions", () => ({
  canManageCv: jest.fn(),
}));

const useCvMock = jest.mocked(useCv);
const canManageCvMock = jest.mocked(canManageCv);

function ContextConsumer() {
  const { cv, canEdit, loading } = useCvContext();
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="name">{cv?.name ?? "none"}</span>
      <span data-testid="can-edit">{String(canEdit)}</span>
    </div>
  );
}

describe("CvProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCvMock.mockReturnValue({
      cv: mockCv,
      loading: false,
      error: undefined,
    });
    canManageCvMock.mockReturnValue(true);
  });

  it("provides CV data and edit permission", () => {
    render(
      <CvProvider cvId="cv-1">
        <ContextConsumer />
      </CvProvider>,
    );

    expect(screen.getByTestId("name")).toHaveTextContent("Jane Developer");
    expect(screen.getByTestId("can-edit")).toHaveTextContent("true");
    expect(canManageCvMock).toHaveBeenCalledWith(mockCv);
  });

  it("sets canEdit to false when CV is missing", () => {
    useCvMock.mockReturnValue({
      cv: null,
      loading: false,
      error: undefined,
    });

    render(
      <CvProvider cvId="cv-1">
        <ContextConsumer />
      </CvProvider>,
    );

    expect(screen.getByTestId("can-edit")).toHaveTextContent("false");
    expect(canManageCvMock).not.toHaveBeenCalled();
  });
});

describe("useCvContext", () => {
  it("throws outside CvProvider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<ContextConsumer />)).toThrow(
      "useCvContext must be used within CvProvider",
    );

    consoleError.mockRestore();
  });
});
