import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent } from "react";
import useProjectsPage from "./use-projects-page";

const mockCreateProject = jest.fn();
const mockUpdateProject = jest.fn();
const mockDeleteProject = jest.fn();
const mockShowSuccess = jest.fn();
const mockShowError = jest.fn();

const projects = [
  {
    id: "2",
    name: "Zulu",
    internal_name: "zulu",
    domain: "HR",
    description: "Desc",
    start_date: "2024-01-01",
    end_date: null,
    environment: ["React"],
  },
  {
    id: "1",
    name: "Alpha",
    internal_name: "alpha",
    domain: "Finance",
    description: "Desc",
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    environment: ["Node"],
  },
];

jest.mock("./use-projects", () => ({
  __esModule: true,
  default: () => ({
    data: { projects },
    loading: false,
    error: null,
  }),
}));

jest.mock("./use-project-mutations", () => ({
  __esModule: true,
  default: () => ({
    createProject: mockCreateProject,
    updateProject: mockUpdateProject,
    deleteProject: mockDeleteProject,
    loading: false,
  }),
}));

jest.mock("../../../hooks/use-action-feedback", () => ({
  __esModule: true,
  default: () => ({
    showSuccess: mockShowSuccess,
    showError: mockShowError,
    FeedbackSnackbar: () => null,
  }),
}));

describe("useProjectsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateProject.mockResolvedValue({ ok: true });
    mockUpdateProject.mockResolvedValue({ ok: true });
    mockDeleteProject.mockResolvedValue({ ok: true });
  });

  it("sorts and filters projects", () => {
    const { result } = renderHook(() => useProjectsPage());

    expect(result.current.projects.map((project) => project.name)).toEqual([
      "Alpha",
      "Zulu",
    ]);

    act(() =>
      result.current.handleSearchChange({
        target: { value: "zulu" },
      } as ChangeEvent<HTMLInputElement>),
    );
    expect(result.current.projects).toHaveLength(1);
    expect(result.current.showNoResults).toBe(false);
  });

  it("toggles sort direction for the same field", () => {
    const { result } = renderHook(() => useProjectsPage());

    act(() => result.current.handleSort("name"));
    expect(result.current.sortDirection).toBe("desc");
    expect(result.current.projects[0]?.name).toBe("Zulu");
  });

  it("opens create dialog with empty defaults", () => {
    const { result } = renderHook(() => useProjectsPage());

    act(() => result.current.openCreateDialog());
    expect(result.current.formDialog.open).toBe(true);
    expect(result.current.formDialog.mode).toBe("create");
  });
});
