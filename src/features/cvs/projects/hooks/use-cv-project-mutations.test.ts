import { act, renderHook } from "@testing-library/react";
import {
  useCvProjectCatalog,
  useCvProjectMutations,
} from "./use-cv-project-mutations";

const mockAddProject = jest.fn();
const mockUpdateProject = jest.fn();
const mockRemoveProject = jest.fn();
const mockUseQuery = jest.fn();

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

jest.mock("../../../../lib/mutation-result", () => ({
  runMutation: jest.fn((fn: () => Promise<unknown>) => fn()),
}));

const { useMutation } = jest.requireMock("@apollo/client/react") as {
  useMutation: jest.Mock;
};

const projectInput = {
  projectId: "proj-1",
  start_date: "2022-06-01",
  end_date: "2023-12-01",
  roles: ["Developer"],
  responsibilities: ["API layer"],
};

describe("use-cv-project-mutations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: { projects: [{ id: "proj-1", name: "Alpha" }] },
    });
  });

  describe("useCvProjectCatalog", () => {
    it("returns catalog projects from query", () => {
      const { result } = renderHook(() => useCvProjectCatalog());

      expect(result.current.catalogProjects).toEqual([
        { id: "proj-1", name: "Alpha" },
      ]);
    });
  });

  describe("useCvProjectMutations", () => {
    beforeEach(() => {
      useMutation
        .mockReturnValueOnce([mockAddProject, { loading: false }])
        .mockReturnValueOnce([mockUpdateProject, { loading: false }])
        .mockReturnValueOnce([mockRemoveProject, { loading: false }]);
    });

    it("adds project to CV", async () => {
      mockAddProject.mockResolvedValue({});

      const { result } = renderHook(() => useCvProjectMutations("cv-1"));

      await act(async () => {
        await result.current.addCvProject(projectInput);
      });

      expect(mockAddProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: "cv-1",
            ...projectInput,
            roles: projectInput.roles,
            responsibilities: projectInput.responsibilities,
          },
        },
      });
    });

    it("removes project from CV", async () => {
      mockRemoveProject.mockResolvedValue({});

      const { result } = renderHook(() => useCvProjectMutations("cv-1"));

      await act(async () => {
        await result.current.removeCvProject("proj-1");
      });

      expect(mockRemoveProject).toHaveBeenCalledWith({
        variables: { project: { cvId: "cv-1", projectId: "proj-1" } },
      });
    });
  });
});
