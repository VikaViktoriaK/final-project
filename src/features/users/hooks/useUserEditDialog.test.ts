import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent } from "react";
import { useUserEditDialog } from "./useUserEditDialog";
import type { UserRow } from "../types";

const mockUpdateUser = jest.fn();
const mockUpdateProfile = jest.fn();

jest.mock("../api/updateUser", () => ({
  useUpdateUserMutation: jest.fn(() => [
    mockUpdateUser,
    { loading: false, error: null },
  ]),
  useUpdateProfileMutation: jest.fn(() => [
    mockUpdateProfile,
    { loading: false, error: null },
  ]),
  useUserEditOptionsQuery: jest.fn(() => ({
    data: {
      departments: [{ id: "dept-1", name: "Engineering" }],
      positions: [{ id: "pos-1", name: "Developer" }],
    },
    loading: false,
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
  role: "Employee",
};

describe("useUserEditDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const payload = btoa(JSON.stringify({ role: "Admin" }));
    localStorage.setItem("hrm_access_token", `header.${payload}.signature`);
    mockUpdateUser.mockResolvedValue({});
    mockUpdateProfile.mockResolvedValue({});
  });

  it("falls back select values when options are unavailable", () => {
    const { result } = renderHook(() =>
      useUserEditDialog({
        user,
        onClose: jest.fn(),
        onSaved: jest.fn(),
      }),
    );

    expect(result.current.selectedDepartmentId).toBe("");
    expect(result.current.selectedPositionId).toBe("");
    expect(result.current.isAdmin).toBe(true);
  });

  it("updates admin and profile fields on save", async () => {
    const onClose = jest.fn();
    const onSaved = jest.fn();
    const { result } = renderHook(() =>
      useUserEditDialog({ user, onClose, onSaved }),
    );

    act(() =>
      result.current.handleFieldChange("firstName")({
        target: { value: " Grace " },
      } as ChangeEvent<HTMLInputElement>),
    );
    act(() =>
      result.current.handleFieldChange("departmentId")({
        target: { value: "dept-1" },
      } as ChangeEvent<HTMLInputElement>),
    );

    await act(async () => {
      await result.current.handleSave();
    });

    expect(mockUpdateUser).toHaveBeenCalledWith({
      variables: {
        user: {
          userId: "user-1",
          departmentId: "dept-1",
          role: "Employee",
        },
      },
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
    expect(onSaved).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
