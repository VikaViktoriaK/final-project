import { act, renderHook } from "@testing-library/react";
import { useUpdateUserSkillDialog } from "./useUpdateUserSkillDialog";

const mockUpdateSkill = jest.fn();

jest.mock("../api/userSkills", () => ({
  useUpdateProfileSkillMutation: jest.fn(() => [
    mockUpdateSkill,
    { loading: false },
  ]),
}));

describe("useUpdateUserSkillDialog", () => {
  const skill = {
    id: "react",
    name: "React",
    categoryId: "frontend",
    categoryName: "Frontend",
    mastery: "Advanced",
    progressColor: "#000",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateSkill.mockResolvedValue({});
  });

  it("closes without mutation when mastery is unchanged", async () => {
    const onClose = jest.fn();
    const { result } = renderHook(() =>
      useUpdateUserSkillDialog({
        userId: "user-1",
        skill,
        onClose,
        onCompleted: jest.fn(),
      }),
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockUpdateSkill).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("updates skill mastery and closes after completion", async () => {
    const onClose = jest.fn();
    const onCompleted = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useUpdateUserSkillDialog({
        userId: "user-1",
        skill,
        onClose,
        onCompleted,
      }),
    );

    act(() => result.current.setMastery("Expert"));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockUpdateSkill).toHaveBeenCalledWith({
      variables: {
        skill: {
          userId: "user-1",
          name: "React",
          categoryId: "frontend",
          mastery: "Expert",
        },
      },
    });
    expect(onCompleted).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
