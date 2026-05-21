import { act, renderHook } from "@testing-library/react";
import { mockCv, mockCvProject } from "../../test-utils/fixtures";
import { createMockCvContextValue } from "../../test-utils/mock-cv-context";
import { useCvContext } from "../../shared/context/cv-context";
import { useCvProjectMutations } from "./use-cv-project-mutations";
import useCvProjectsPage from "./use-cv-projects-page";

const mockAddCvProject = jest.fn();
const mockUpdateCvProject = jest.fn();
const mockRemoveCvProject = jest.fn();
const mockShowSuccess = jest.fn();
const mockShowError = jest.fn();

jest.mock("../../shared/context/cv-context", () => ({
  useCvContext: jest.fn(),
}));

jest.mock("./use-cv-project-mutations", () => ({
  useCvProjectMutations: jest.fn(),
}));

jest.mock("../../../../hooks/use-search", () => ({
  __esModule: true,
  default: () => ({
    query: "",
    onChange: jest.fn(),
  }),
}));

jest.mock("../../../../hooks/use-dialog", () => ({
  __esModule: true,
  default: () => {
    let open = false;
    let payload: string | null = null;
    return {
      isOpen: open,
      payload,
      open: (value?: string) => {
        open = true;
        payload = value ?? null;
      },
      close: () => {
        open = false;
        payload = null;
      },
    };
  },
}));

jest.mock("../../../../hooks/use-anchored-menu", () => ({
  __esModule: true,
  default: () => ({
    anchor: null,
    item: null,
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

jest.mock("../../../../hooks/use-action-feedback", () => ({
  __esModule: true,
  default: () => ({
    showSuccess: mockShowSuccess,
    showError: mockShowError,
    FeedbackSnackbar: null,
  }),
}));

const useCvContextMock = jest.mocked(useCvContext);
const useCvProjectMutationsMock = jest.mocked(useCvProjectMutations);

describe("useCvProjectsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCvContextMock.mockReturnValue(
      createMockCvContextValue({
        cv: { ...mockCv, projects: [mockCvProject] },
      }),
    );
    useCvProjectMutationsMock.mockReturnValue({
      catalogProjects: [{ id: "catalog-1", name: "Catalog Project" }],
      addCvProject: mockAddCvProject,
      updateCvProject: mockUpdateCvProject,
      removeCvProject: mockRemoveCvProject,
      loading: false,
    });
  });

  it("exposes sorted projects from CV", () => {
    const { result } = renderHook(() => useCvProjectsPage());

    expect(result.current.projects).toHaveLength(1);
    expect(result.current.projects[0].name).toBe("Alpha Portal");
    expect(result.current.isEmpty).toBe(false);
  });

  it("toggles sort direction for the same field", () => {
    const { result } = renderHook(() => useCvProjectsPage());

    act(() => {
      result.current.handleSort("domain");
    });

    expect(result.current.sortDirection).toBe("desc");
  });

  it("reports empty state when CV has no projects", () => {
    useCvContextMock.mockReturnValue(
      createMockCvContextValue({ cv: { ...mockCv, projects: [] } }),
    );

    const { result } = renderHook(() => useCvProjectsPage());

    expect(result.current.isEmpty).toBe(true);
    expect(result.current.showNoResults).toBe(true);
  });
});
