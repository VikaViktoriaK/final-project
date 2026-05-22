import { act, renderHook } from "@testing-library/react";
import { useAddUserLanguageDialog } from "./useAddUserLanguageDialog";

const mockAddLanguage = jest.fn();

jest.mock("../api/userLanguages", () => ({
  useLanguageCatalogQuery: jest.fn(() => ({
    data: { languages: [{ name: "English" }, { name: "Spanish" }] },
    loading: false,
  })),
  useAddProfileLanguageMutation: jest.fn(() => [
    mockAddLanguage,
    { loading: false },
  ]),
}));

describe("useAddUserLanguageDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAddLanguage.mockResolvedValue({});
  });

  it("filters profile languages from addable options", () => {
    const { result } = renderHook(() =>
      useAddUserLanguageDialog({
        userId: "user-1",
        currentLanguages: [{ name: "English", proficiency: "C1" }],
        onClose: jest.fn(),
        onCompleted: jest.fn(),
      }),
    );

    expect(result.current.addable.map((item) => item.name)).toEqual([
      "Spanish",
    ]);
  });

  it("falls back to empty selected value when selected language becomes unavailable", () => {
    const { result } = renderHook(() =>
      useAddUserLanguageDialog({
        userId: "user-1",
        currentLanguages: [{ name: "English", proficiency: "C1" }],
        onClose: jest.fn(),
        onCompleted: jest.fn(),
      }),
    );

    act(() => result.current.setLanguageName("English"));

    expect(result.current.languageName).toBe("English");
    expect(result.current.selectedLanguageName).toBe("");
    expect(result.current.canSubmit).toBe(false);
  });

  it("submits selected language and closes after completion", async () => {
    const onClose = jest.fn();
    const onCompleted = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useAddUserLanguageDialog({
        userId: "user-1",
        currentLanguages: [],
        onClose,
        onCompleted,
      }),
    );

    act(() => result.current.setLanguageName("Spanish"));
    act(() => result.current.setProficiency("B2"));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockAddLanguage).toHaveBeenCalledWith({
      variables: {
        language: { userId: "user-1", name: "Spanish", proficiency: "B2" },
      },
    });
    expect(onCompleted).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
