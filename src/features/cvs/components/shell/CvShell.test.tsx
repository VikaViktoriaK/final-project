import { screen } from "@testing-library/react";
import { mockCv } from "../../test-utils/fixtures";
import { renderWithTheme } from "../../test-utils/render-with-theme";
import useCv from "../../shared/hooks/use-cv";
import useCvShellNavigation from "../../shared/hooks/use-cv-shell-navigation";
import CvShell from "./CvShell";

jest.mock("../../shared/hooks/use-cv", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../shared/hooks/use-cv-shell-navigation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../shared/utils/cv-permissions", () => ({
  canManageCv: () => true,
}));

const useCvMock = jest.mocked(useCv);
const useCvShellNavigationMock = jest.mocked(useCvShellNavigation);

describe("CvShell", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCvShellNavigationMock.mockReturnValue({
      activeSegment: "details",
      activeTabLabel: "Details",
      showSectionInBreadcrumb: false,
    });
  });

  it("shows loading state", () => {
    useCvMock.mockReturnValue({
      cv: null,
      loading: true,
      error: undefined,
    });

    renderWithTheme(
      <CvShell cvId="cv-1">
        <div>Child</div>
      </CvShell>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state", () => {
    useCvMock.mockReturnValue({
      cv: null,
      loading: false,
      error: new Error("Load failed"),
    });

    renderWithTheme(
      <CvShell cvId="cv-1">
        <div>Child</div>
      </CvShell>,
    );

    expect(screen.getByText("Load failed")).toBeInTheDocument();
  });

  it("renders tabs and children when CV is loaded", () => {
    useCvMock.mockReturnValue({
      cv: mockCv,
      loading: false,
      error: undefined,
    });

    renderWithTheme(
      <CvShell cvId="cv-1">
        <div>Tab body</div>
      </CvShell>,
    );

    expect(screen.getByText("Jane Developer")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "DETAILS" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "SKILLS" })).toBeInTheDocument();
    expect(screen.getByText("Tab body")).toBeInTheDocument();
  });
});
