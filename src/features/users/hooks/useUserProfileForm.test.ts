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

  it("does not submit when form is not dirty", async () => {
    const stableUser: UserRow = {
      ...user,
      departmentId: "dept-1",
      department: "Engineering",
      positionId: "pos-1",
      position: "Developer",
    };

    const { result } = renderHook(() =>
      useUserProfileForm({
        user: stableUser,
        canEditProfile: true,
        onUpdated: jest.fn(),
      }),
    );

    expect(result.current.canSubmit).toBe(false);

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockUpdateProfile).not.toHaveBeenCalled();
  });

  it("uploads avatar and clears submit errors on field change", async () => {
    const onUpdated = jest.fn();
    const { result } = renderHook(() =>
      useUserProfileForm({
        user: { ...user, avatarUrl: "old.png" },
        canEditProfile: true,
        avatarUpload: {
          previewUrl: "new.png",
          base64: "data:image/png;base64,abc",
          size: 1024,
          type: "image/png",
        },
        onUpdated,
      }),
    );

    expect(result.current.canSubmit).toBe(true);

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockUpdateProfile).toHaveBeenCalled();
    expect(mockUploadAvatar).toHaveBeenCalledWith({
      variables: {
        avatar: {
          userId: "user-1",
          base64: "data:image/png;base64,abc",
          size: 1024,
          type: "image/png",
        },
      },
    });
    expect(onUpdated).toHaveBeenCalledTimes(1);
  });

  it("shows avatar size validation error", async () => {
    const { result } = renderHook(() =>
      useUserProfileForm({
        user: { ...user, avatarUrl: "old.png" },
        canEditProfile: true,
        avatarUpload: {
          previewUrl: "new.png",
          base64: "data:image/png;base64,abc",
          size: 10_000_000,
          type: "image/png",
        },
        onUpdated: jest.fn(),
      }),
    );

    act(() =>
      result.current.handleFieldChange("firstName")({
        target: { value: "Grace" },
      } as ChangeEvent<HTMLInputElement>),
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.submitError).toContain("500 KB");
    expect(mockUploadAvatar).not.toHaveBeenCalled();
  });

  it("stores submit errors from failed mutations", async () => {
    mockUpdateProfile.mockRejectedValueOnce(new Error("Update failed"));
    const { result } = renderHook(() =>
      useUserProfileForm({
        user,
        canEditProfile: true,
        onUpdated: jest.fn(),
      }),
    );

    act(() =>
      result.current.handleFieldChange("lastName")({
        target: { value: "Byron" },
      } as ChangeEvent<HTMLInputElement>),
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.submitError).toBe("Update failed");

    act(() =>
      result.current.handleFieldChange("lastName")({
        target: { value: "Byron" },
      } as ChangeEvent<HTMLInputElement>),
    );
    expect(result.current.submitError).toBeNull();
  });
});
