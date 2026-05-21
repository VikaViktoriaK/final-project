import { act, renderHook } from "@testing-library/react";
import { useSkillsPage } from "./useSkillsPage";

const mockCreateSkill = jest.fn();
const mockUpdateSkill = jest.fn();
const mockDeleteSkill = jest.fn();
const mockRefetch = jest.fn();

jest.mock(
  "@/features/auth/lib/auth-storage",
  () => ({
    useAuthSnapshot: jest.fn(() => ({ role: "Admin" })),
  }),
  { virtual: true },
);

jest.mock("../api/skills", () => ({
  useSkillsCatalogQuery: jest.fn(() => ({
    skills: [
      {
        id: "2",
        name: "React",
        categoryId: "frontend",
        categoryName: "Frontend",
      },
      { id: "1", name: "Node", categoryId: "backend", categoryName: "Backend" },
    ],
    categories: [
      { id: "frontend", name: "Frontend" },
      { id: "backend", name: "Backend" },
    ],
    loading: false,
    error: null,
    refetch: mockRefetch,
  })),
  useCreateSkillMutation: jest.fn(() => [mockCreateSkill, { loading: false }]),
  useUpdateSkillMutation: jest.fn(() => [mockUpdateSkill, { loading: false }]),
  useDeleteSkillMutation: jest.fn(() => [mockDeleteSkill, { loading: false }]),
}));

describe("useSkillsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateSkill.mockResolvedValue({});
    mockUpdateSkill.mockResolvedValue({});
    mockDeleteSkill.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  it("filters and sorts skills", () => {
    const { result } = renderHook(() => useSkillsPage());

    expect(result.current.processedSkills.map((item) => item.name)).toEqual([
      "Node",
      "React",
    ]);

    act(() => result.current.setQuery("rea"));
    expect(result.current.processedSkills.map((item) => item.name)).toEqual([
      "React",
    ]);
  });

  it("sorts by category and toggles sort direction", () => {
    const { result } = renderHook(() => useSkillsPage());

    act(() => result.current.handleSort("category"));
    expect(
      result.current.processedSkills.map((item) => item.categoryName),
    ).toEqual(["Backend", "Frontend"]);

    act(() => result.current.handleSort("category"));
    expect(result.current.order).toBe("desc");
    expect(
      result.current.processedSkills.map((item) => item.categoryName),
    ).toEqual(["Frontend", "Backend"]);
  });

  it("creates, updates, and deletes skills", async () => {
    const { result } = renderHook(() => useSkillsPage());
    const values = { name: "TypeScript", categoryId: "frontend" };

    await act(async () => {
      await result.current.handleFormSubmit(values);
    });
    expect(mockCreateSkill).toHaveBeenCalledWith({
      variables: { skill: values },
    });

    act(() =>
      result.current.form.openEdit({
        id: "2",
        name: "React",
        categoryId: "frontend",
        categoryName: "Frontend",
      }),
    );
    await act(async () => {
      await result.current.handleFormSubmit(values);
    });
    expect(mockUpdateSkill).toHaveBeenCalledWith({
      variables: {
        skill: { skillId: "2", name: "TypeScript", categoryId: "frontend" },
      },
    });

    act(() =>
      result.current.deleteDialog.requestDelete({
        id: "1",
        name: "Node",
        categoryId: "backend",
        categoryName: "Backend",
      }),
    );
    await act(async () => {
      await result.current.handleDeleteConfirm();
    });
    expect(mockDeleteSkill).toHaveBeenCalledWith({
      variables: { skill: { skillId: "1" } },
    });
  });
});
