import { act, renderHook } from "@testing-library/react";
import { useUserSkillsPage } from "./useUserSkillsPage";

const mockDeleteSkill = jest.fn();
const mockRefetchSkills = jest.fn();

jest.mock("next/navigation", () => ({
  useParams: () => ({ userId: "user-1" }),
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

jest.mock("../api/userSkills", () => ({
  useProfileWithSkillsQuery: jest.fn(() => ({
    data: {
      profile: {
        skills: [
          { name: "React", mastery: "Advanced", categoryId: "frontend" },
        ],
      },
    },
    loading: false,
    error: null,
    refetch: mockRefetchSkills,
  })),
  useSkillCategoriesQuery: jest.fn(() => ({
    categories: [{ id: "frontend", name: "Frontend" }],
    loading: false,
  })),
  useDeleteProfileSkillMutation: jest.fn(() => [
    mockDeleteSkill,
    { loading: false },
  ]),
}));

describe("useUserSkillsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const payload = btoa(JSON.stringify({ role: "Admin", id: "admin-1" }));
    localStorage.setItem("hrm_access_token", `header.${payload}.signature`);
    mockDeleteSkill.mockResolvedValue({});
    mockRefetchSkills.mockResolvedValue({});
  });

  it("groups profile skills and allows management for admins", () => {
    const { result } = renderHook(() => useUserSkillsPage());

    expect(result.current.breadcrumbName).toBe("Ada Lovelace");
    expect(result.current.hasSkills).toBe(true);
    expect(result.current.canManageSkills).toBe(true);
    expect(result.current.categories[0]?.skills[0]?.name).toBe("React");
  });

  it("toggles remove mode selection and deletes selected skills", async () => {
    const { result } = renderHook(() => useUserSkillsPage());
    const skill = result.current.categories[0].skills[0];

    act(() => result.current.startRemoveMode());
    act(() => result.current.handleSkillClick(skill));
    await act(async () => {
      await result.current.handleBulkRemoveConfirm();
    });

    expect(mockDeleteSkill).toHaveBeenCalledWith({
      variables: {
        skill: {
          userId: "user-1",
          name: ["React"],
        },
      },
    });
    expect(result.current.bulk.removeMode).toBe(false);
    expect(mockRefetchSkills).toHaveBeenCalledTimes(1);
  });
});
