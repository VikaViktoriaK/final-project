import { act, renderHook } from "@testing-library/react";
import { useAddUserSkillDialog } from "./useAddUserSkillDialog";

const mockAddSkill = jest.fn();

jest.mock("../api/userSkills", () => ({
  useSkillsCatalogQuery: jest.fn(() => ({
    catalog: [
      { id: "1", name: "React", categoryId: "frontend" },
      { id: "2", name: "Node", categoryId: "backend" },
    ],
    loading: false,
  })),
  useAddProfileSkillMutation: jest.fn(() => [mockAddSkill, { loading: false }]),
}));

describe("useAddUserSkillDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddSkill.mockResolvedValue({});
  });

  it("filters skills already on profile", () => {
    const { result } = renderHook(() =>
      useAddUserSkillDialog({
        userId: "user-1",
        currentSkills: [
          { name: "React", mastery: "Advanced", categoryId: "frontend" },
        ],
        onClose: jest.fn(),
        onCompleted: jest.fn(),
      }),
    );

    expect(result.current.addable.map((item) => item.name)).toEqual(["Node"]);
  });

  it("submits selected skill and closes after completion", async () => {
    const onClose = jest.fn();
    const onCompleted = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useAddUserSkillDialog({
        userId: "user-1",
        currentSkills: [],
        onClose,
        onCompleted,
      }),
    );

    act(() => result.current.setSkillName("Node"));
    act(() => result.current.setMastery("Competent"));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockAddSkill).toHaveBeenCalledWith({
      variables: {
        skill: {
          userId: "user-1",
          name: "Node",
          categoryId: "backend",
          mastery: "Competent",
        },
      },
    });
    expect(onCompleted).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
