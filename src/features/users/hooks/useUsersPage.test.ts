import { act, renderHook } from "@testing-library/react";
import { useUsersPage } from "./useUsersPage";

const mockPush = jest.fn();
const mockDeleteUser = jest.fn();
const mockRefetch = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("../api/getUsers", () => ({
  useUsersQuery: jest.fn(() => ({
    users: [
      {
        id: "2",
        firstName: "Grace",
        lastName: "Hopper",
        email: "grace@example.com",
        department: "Engineering",
        position: "Developer",
      },
      {
        id: "1",
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        department: "Engineering",
        position: "Lead",
      },
    ],
    loading: false,
    error: null,
    refetch: mockRefetch,
  })),
}));

jest.mock("../api/deleteUser", () => ({
  useDeleteUserMutation: jest.fn(() => [mockDeleteUser, { loading: false }]),
}));

describe("useUsersPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const payload = btoa(JSON.stringify({ role: "Admin" }));
    localStorage.setItem("hrm_access_token", `header.${payload}.signature`);
    mockDeleteUser.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  it("exposes admin state and sorted users", () => {
    const { result } = renderHook(() => useUsersPage());

    expect(result.current.isAdmin).toBe(true);
    expect(result.current.processedUsers.map((user) => user.firstName)).toEqual(
      ["Ada", "Grace"],
    );
  });

  it("navigates to user profile on view", () => {
    const { result } = renderHook(() => useUsersPage());

    act(() => result.current.viewUser(result.current.processedUsers[0]));
    expect(mockPush).toHaveBeenCalledWith("/users/1/profile");
  });

  it("deletes selected user and refetches", async () => {
    const { result } = renderHook(() => useUsersPage());
    const target = result.current.processedUsers[0];

    act(() => result.current.deleteDialog.requestDelete(target));
    await act(async () => {
      await result.current.handleDeleteConfirm();
    });

    expect(mockDeleteUser).toHaveBeenCalledWith({
      variables: { userId: target.id },
    });
    expect(result.current.deleteDialog.target).toBeNull();
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
