import { act, renderHook } from "@testing-library/react";
import { useLanguagesPage } from "./useLanguagesPage";

const mockCreateLanguage = jest.fn();
const mockUpdateLanguage = jest.fn();
const mockDeleteLanguage = jest.fn();
const mockRefetch = jest.fn();

jest.mock(
  "@/features/auth/lib/auth-storage",
  () => ({
    useAuthSnapshot: jest.fn(() => ({ role: "Employee" })),
  }),
  { virtual: true },
);

jest.mock("../api/languages", () => ({
  useLanguagesQuery: jest.fn(() => ({
    languages: [
      { id: "1", name: "German", nativeName: "Deutsch", iso2: "DE" },
      { id: "2", name: "English", nativeName: "English", iso2: "EN" },
      { id: "3", name: "Polish", nativeName: "Polski", iso2: "PL" },
    ],
    loading: false,
    error: null,
    refetch: mockRefetch,
  })),
  useCreateLanguageMutation: jest.fn(() => [
    mockCreateLanguage,
    { loading: false },
  ]),
  useUpdateLanguageMutation: jest.fn(() => [
    mockUpdateLanguage,
    { loading: false },
  ]),
  useDeleteLanguageMutation: jest.fn(() => [
    mockDeleteLanguage,
    { loading: false },
  ]),
}));

describe("useLanguagesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateLanguage.mockResolvedValue({});
    mockUpdateLanguage.mockResolvedValue({});
    mockDeleteLanguage.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  it("derives admin state and sorted languages", () => {
    const { result } = renderHook(() => useLanguagesPage());

    expect(result.current.isAdmin).toBe(false);
    expect(result.current.processedLanguages.map((item) => item.name)).toEqual([
      "English",
      "German",
      "Polish",
    ]);
  });

  it("filters by name, native name, or iso code", () => {
    const { result } = renderHook(() => useLanguagesPage());

    act(() => result.current.setQuery("pol"));
    expect(result.current.processedLanguages.map((item) => item.name)).toEqual([
      "Polish",
    ]);

    act(() => result.current.setQuery("de"));
    expect(result.current.processedLanguages.map((item) => item.name)).toEqual([
      "German",
    ]);
  });

  it("creates and updates languages with api payload shape", async () => {
    const { result } = renderHook(() => useLanguagesPage());
    const values = { name: "Spanish", nativeName: "Español", iso2: "ES" };

    await act(async () => {
      await result.current.handleFormSubmit(values);
    });
    expect(mockCreateLanguage).toHaveBeenCalledWith({
      variables: {
        language: { name: "Spanish", native_name: "Español", iso2: "ES" },
      },
    });

    act(() =>
      result.current.form.openEdit({
        id: "2",
        name: "English",
        nativeName: "English",
        iso2: "EN",
      }),
    );
    await act(async () => {
      await result.current.handleFormSubmit(values);
    });
    expect(mockUpdateLanguage).toHaveBeenCalledWith({
      variables: {
        language: {
          languageId: "2",
          name: "Spanish",
          native_name: "Español",
          iso2: "ES",
        },
      },
    });
  });

  it("deletes selected language and clears the dialog target", async () => {
    const { result } = renderHook(() => useLanguagesPage());

    act(() =>
      result.current.deleteDialog.requestDelete({
        id: "1",
        name: "German",
        nativeName: "Deutsch",
        iso2: "DE",
      }),
    );
    await act(async () => {
      await result.current.handleDeleteConfirm();
    });

    expect(mockDeleteLanguage).toHaveBeenCalledWith({
      variables: { language: { languageId: "1" } },
    });
    expect(result.current.deleteDialog.target).toBeNull();
  });
});
