import { act, renderHook } from "@testing-library/react";
import {
  useCvSkillCatalog,
  useCvSkillMutations,
} from "./use-cv-skill-mutations";

const mockAddSkill = jest.fn();
const mockUpdateSkill = jest.fn();
const mockDeleteSkills = jest.fn();
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

describe("use-cv-skill-mutations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useCvSkillCatalog", () => {
    it("normalizes skill ids to strings", () => {
      mockUseQuery
        .mockReturnValueOnce({ data: { skillCategories: [{ id: "c1" }] } })
        .mockReturnValueOnce({
          data: {
            skills: [{ id: 42, name: "React", category: null }],
          },
        });

      const { result } = renderHook(() => useCvSkillCatalog());

      expect(result.current.categories).toEqual([{ id: "c1" }]);
      expect(result.current.allSkills).toEqual([
        { id: "42", name: "React", category: null },
      ]);
    });
  });

  describe("useCvSkillMutations", () => {
    beforeEach(() => {
      useMutation
        .mockReturnValueOnce([mockAddSkill, { loading: false }])
        .mockReturnValueOnce([mockDeleteSkills, { loading: false }])
        .mockReturnValueOnce([mockUpdateSkill, { loading: false }]);
    });

    it("adds a skill with cv id", async () => {
      mockAddSkill.mockResolvedValue({});

      const { result } = renderHook(() => useCvSkillMutations("cv-1"));

      await act(async () => {
        await result.current.addCvSkill({
          name: "TypeScript",
          categoryId: "cat-1",
          mastery: "Proficient",
        });
      });

      expect(mockAddSkill).toHaveBeenCalledWith({
        variables: {
          skill: {
            cvId: "cv-1",
            name: "TypeScript",
            categoryId: "cat-1",
            mastery: "Proficient",
          },
        },
      });
    });

    it("removes skills by name", async () => {
      mockDeleteSkills.mockResolvedValue({});

      const { result } = renderHook(() => useCvSkillMutations("cv-1"));

      await act(async () => {
        await result.current.removeCvSkills(["React", "Node"]);
      });

      expect(mockDeleteSkills).toHaveBeenCalledWith({
        variables: { skill: { cvId: "cv-1", name: ["React", "Node"] } },
      });
    });

    it("updates skill with optional category id", async () => {
      mockUpdateSkill.mockResolvedValue({});

      const { result } = renderHook(() => useCvSkillMutations("cv-1"));

      await act(async () => {
        await result.current.updateCvSkill({
          name: "React",
          categoryId: null,
          mastery: "Expert",
        });
      });

      expect(mockUpdateSkill).toHaveBeenCalledWith({
        variables: {
          skill: {
            cvId: "cv-1",
            name: "React",
            categoryId: undefined,
            mastery: "Expert",
          },
        },
      });
    });
  });
});
