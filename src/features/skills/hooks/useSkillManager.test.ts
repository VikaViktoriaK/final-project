import { act, renderHook } from "@testing-library/react";
import useSkillManager from "./useSkillManager";

jest.mock("../../../hooks/use-action-feedback", () => ({
  __esModule: true,
  default: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn(),
    FeedbackSnackbar: () => null,
  }),
}));

describe("useSkillManager", () => {
  const categories = [
    {
      id: "frontend",
      name: "Frontend",
      parent: null,
      children: [{ id: "react", name: "React" }],
    },
  ];

  const catalogSkills = [
    {
      id: "skill-1",
      name: "React",
      category: {
        id: "react",
        name: "React",
        parent: { id: "frontend", name: "Frontend" },
      },
    },
    {
      id: "skill-2",
      name: "Node",
      category: { id: "backend", name: "Backend", parent: null },
    },
  ];

  const mutations = {
    addSkill: jest.fn().mockResolvedValue({ ok: true }),
    updateSkill: jest.fn().mockResolvedValue({ ok: true }),
    removeSkills: jest.fn().mockResolvedValue({ ok: true }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("groups current skills and filters available catalog skills", () => {
    const { result } = renderHook(() =>
      useSkillManager({
        currentSkills: [
          { name: "React", categoryId: "react", mastery: "Advanced" },
        ],
        catalogSkills,
        categories,
        canEdit: true,
        loading: false,
        defaultMastery: "Novice",
        mutations,
      }),
    );

    expect(result.current.grouped).toEqual([
      {
        categoryLabel: "Frontend",
        skills: [{ name: "React", categoryId: "react", mastery: "Advanced" }],
      },
    ]);
    expect(result.current.addDialog.skills.map((skill) => skill.name)).toEqual([
      "Node",
    ]);
  });

  it("adds selected skill and closes dialog on success", async () => {
    const { result } = renderHook(() =>
      useSkillManager({
        currentSkills: [],
        catalogSkills,
        categories,
        canEdit: true,
        loading: false,
        defaultMastery: "Novice",
        mutations,
      }),
    );

    act(() => result.current.openAddDialog());
    act(() => result.current.addDialog.onSkillChange("skill-2"));
    act(() => result.current.addDialog.onMasteryChange("Advanced"));
    await act(async () => {
      await result.current.addDialog.onSubmit();
    });

    expect(mutations.addSkill).toHaveBeenCalledWith({
      name: "Node",
      categoryId: "backend",
      mastery: "Advanced",
    });
    expect(result.current.addDialog.open).toBe(false);
  });

  it("toggles remove mode selection and removes skills", async () => {
    const { result } = renderHook(() =>
      useSkillManager({
        currentSkills: [
          { name: "React", categoryId: "react", mastery: "Advanced" },
          { name: "Node", categoryId: "backend", mastery: "Novice" },
        ],
        catalogSkills,
        categories,
        canEdit: true,
        loading: false,
        defaultMastery: "Novice",
        mutations,
      }),
    );

    act(() => result.current.enableRemoveMode());
    act(() => result.current.toggleSkill("React"));
    await act(async () => {
      await result.current.handleRemove();
    });

    expect(mutations.removeSkills).toHaveBeenCalledWith(["React"]);
    expect(result.current.removeMode).toBe(false);
    expect(result.current.selected).toEqual([]);
  });
});
