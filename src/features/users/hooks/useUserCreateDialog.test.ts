import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent } from "react";
import { useUserCreateDialog } from "./useUserCreateDialog";

const mockCreateUser = jest.fn();

jest.mock("../api/createUser", () => ({
  useCreateUserMutation: jest.fn(() => [
    mockCreateUser,
    { loading: false, error: null },
  ]),
}));

jest.mock("../api/updateUser", () => ({
  useUserEditOptionsQuery: jest.fn(() => ({
    data: {
      departments: [{ id: "dept-1", name: "Engineering" }],
      positions: [{ id: "pos-1", name: "Developer" }],
    },
    loading: false,
  })),
}));

describe("useUserCreateDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateUser.mockResolvedValue({});
  });

  it("sets field validation errors for invalid form", async () => {
    const { result } = renderHook(() =>
      useUserCreateDialog({ onClose: jest.fn(), onCreated: jest.fn() }),
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.fieldErrors.email).toBe("Invalid email format.");
    expect(mockCreateUser).not.toHaveBeenCalled();
  });

  it("creates user with trimmed payload and closes dialog", async () => {
    const onClose = jest.fn();
    const onCreated = jest.fn();
    const { result } = renderHook(() =>
      useUserCreateDialog({ onClose, onCreated }),
    );

    act(() =>
      result.current.handleField("email")({
        target: { value: " ada@example.com " },
      } as ChangeEvent<HTMLInputElement>),
    );
    act(() =>
      result.current.handleField("password")({
        target: { value: "password1" },
      } as ChangeEvent<HTMLInputElement>),
    );
    act(() =>
      result.current.handleField("firstName")({
        target: { value: "Ada" },
      } as ChangeEvent<HTMLInputElement>),
    );
    act(() =>
      result.current.handleField("lastName")({
        target: { value: "Lovelace" },
      } as ChangeEvent<HTMLInputElement>),
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockCreateUser).toHaveBeenCalledWith({
      variables: {
        user: {
          auth: { email: "ada@example.com", password: "password1" },
          profile: { first_name: "Ada", last_name: "Lovelace" },
          cvsIds: [],
          role: "Employee",
        },
      },
    });
    expect(onCreated).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
