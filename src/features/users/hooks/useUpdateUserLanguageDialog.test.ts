import { act, renderHook } from "@testing-library/react";
import { useUpdateUserLanguageDialog } from "./useUpdateUserLanguageDialog";

const mockUpdateLanguage = jest.fn();

jest.mock("../api/userLanguages", () => ({
  useUpdateProfileLanguageMutation: jest.fn(() => [
    mockUpdateLanguage,
    { loading: false },
  ]),
}));

describe("useUpdateUserLanguageDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateLanguage.mockResolvedValue({});
  });

  it("does nothing when proficiency is unchanged", async () => {
    const onClose = jest.fn();
    const { result } = renderHook(() =>
      useUpdateUserLanguageDialog({
        userId: "user-1",
        language: { name: "English", proficiency: "C1" },
        onClose,
        onCompleted: jest.fn(),
      }),
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockUpdateLanguage).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("updates language proficiency and closes after completion", async () => {
    const onClose = jest.fn();
    const onCompleted = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useUpdateUserLanguageDialog({
        userId: "user-1",
        language: { name: "English", proficiency: "C1" },
        onClose,
        onCompleted,
      }),
    );

    act(() => result.current.setProficiency("B2"));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockUpdateLanguage).toHaveBeenCalledWith({
      variables: {
        language: {
          userId: "user-1",
          name: "English",
          proficiency: "B2",
        },
      },
    });
    expect(onCompleted).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
