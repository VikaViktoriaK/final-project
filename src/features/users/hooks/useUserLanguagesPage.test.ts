import { act, renderHook } from "@testing-library/react";
import { useUserLanguagesPage } from "./useUserLanguagesPage";

const mockReplace = jest.fn();
const mockDeleteLanguage = jest.fn();
const mockRefetch = jest.fn();

jest.mock("next/navigation", () => ({
  useParams: () => ({ userId: "user-1" }),
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock("../api/getUser", () => ({
  useUserQuery: jest.fn(() => ({
    user: {
      id: "user-1",
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      department: "Engineering",
      position: "Developer",
    },
    loading: false,
    error: null,
  })),
}));

jest.mock("../api/userLanguages", () => ({
  useProfileWithLanguagesQuery: jest.fn(() => ({
    data: {
      profile: {
        languages: [
          { name: "English", proficiency: "C1" },
          { name: "Spanish", proficiency: "B2" },
        ],
      },
    },
    loading: false,
    error: null,
    refetch: mockRefetch,
  })),
  useDeleteProfileLanguageMutation: jest.fn(() => [
    mockDeleteLanguage,
    { loading: false },
  ]),
}));

describe("useUserLanguagesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const payload = btoa(JSON.stringify({ role: "Admin", id: "admin-1" }));
    localStorage.setItem("hrm_access_token", `header.${payload}.signature`);
    mockDeleteLanguage.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  it("loads languages and allows admin management", () => {
    const { result } = renderHook(() => useUserLanguagesPage());

    expect(result.current.languages).toHaveLength(2);
    expect(result.current.canManageLanguages).toBe(true);
    expect(result.current.breadcrumbName).toBe("Ada Lovelace");
  });

  it("selects languages in remove mode and deletes them", async () => {
    const { result } = renderHook(() => useUserLanguagesPage());

    act(() => result.current.startRemoveMode());
    act(() => result.current.handleLanguageClick(result.current.languages[0]));
    await act(async () => {
      await result.current.handleBulkRemoveConfirm();
    });

    expect(mockDeleteLanguage).toHaveBeenCalledWith({
      variables: {
        language: {
          userId: "user-1",
          name: "English",
        },
      },
    });
    expect(result.current.bulk.removeMode).toBe(false);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
