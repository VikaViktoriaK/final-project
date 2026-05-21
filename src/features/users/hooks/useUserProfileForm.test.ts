import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent } from "react";
import { useUserProfileForm } from "./useUserProfileForm";
import type { UserRow } from "../types";

const mockUpdateProfile = jest.fn();
const mockUploadAvatar = jest.fn();
const mockUpdateUser = jest.fn();

jest.mock("../api/updateUser", () => ({
  useUpdateProfileMutation: jest.fn(() => [
    mockUpdateProfile,
    { loading: false },
  ]),
  useUploadAvatarMutation: jest.fn(() => [
    mockUploadAvatar,
    { loading: false },
  ]),
  useUpdateUserMutation: jest.fn(() => [mockUpdateUser, { loading: false }]),
  useUserEditOptionsQuery: jest.fn(() => ({
    data: {
      departments: [{ id: "dept-1", name: "Engineering" }],
      positions: [{ id: "pos-1", name: "Developer" }],
    },
  })),
}));

const user: UserRow = {
  id: "user-1",
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  departmentId: "missing-dept",
  department: "Old department",
  positionId: "missing-pos",
  position: "Old position",
};

describe("useUserProfileForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateProfile.mockResolvedValue({});
    mockUploadAvatar.mockResolvedValue({});
    mockUpdateUser.mockResolvedValue({});
  });

  it("falls back select values to empty when current options are unavailable", () => {
    const { result } = renderHook(() =>
      useUserProfileForm({
        user,
        canEditProfile: true,
        onUpdated: jest.fn(),
      }),
    );

    expect(result.current.selectedDepartmentId).toBe("");
    expect(result.current.selectedPositionId).toBe("");
    expect(result.current.canSubmit).toBe(true);
  });

  it("updates profile names and admin fields when form changes", async () => {
    const onUpdated = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useUserProfileForm({
        user,
        canEditProfile: true,
        onUpdated,
      }),
    );

    act(() =>
      result.current.handleFieldChange("firstName")({
        target: { value: " Grace " },
      } as ChangeEvent<HTMLInputElement>),
    );
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockUpdateProfile).toHaveBeenCalledWith({
      variables: {
        profile: {
          userId: "user-1",
          first_name: "Grace",
          last_name: "Lovelace",
        },
      },
    });
    expect(mockUpdateUser).toHaveBeenCalledWith({
      variables: {
        user: {
          userId: "user-1",
          departmentId: undefined,
          positionId: undefined,
        },
      },
    });
    expect(onUpdated).toHaveBeenCalledTimes(1);
  });
});
