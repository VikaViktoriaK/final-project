import { act, renderHook } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import useResetPassword from "./use-reset-password";

const mockResetPassword = jest.fn();

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: () => [mockResetPassword, { loading: false, error: null }],
}));

const useSearchParamsMock = jest.mocked(useSearchParams);

describe("useResetPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSearchParamsMock.mockReturnValue({
      get: (key: string) => (key === "token" ? "reset-token" : null),
    } as ReturnType<typeof useSearchParams>);
  });

  it("reads token from search params", () => {
    const { result } = renderHook(() => useResetPassword());
    expect(result.current.token).toBe("reset-token");
  });

  it("sets isSuccess after mutation with bearer token", async () => {
    mockResetPassword.mockResolvedValue({ data: { resetPassword: true } });

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.resetPasswordUser({
        newPassword: "newpassword1",
        confirmNewPassword: "newpassword1",
      });
    });

    expect(mockResetPassword).toHaveBeenCalledWith({
      variables: { auth: { newPassword: "newpassword1" } },
      context: { headers: { Authorization: "Bearer reset-token" } },
    });
    expect(result.current.isSuccess).toBe(true);
  });

  it("does not call mutation when token is missing", async () => {
    useSearchParamsMock.mockReturnValue({
      get: () => null,
    } as ReturnType<typeof useSearchParams>);

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.resetPasswordUser({
        newPassword: "newpassword1",
        confirmNewPassword: "newpassword1",
      });
    });

    expect(mockResetPassword).not.toHaveBeenCalled();
    expect(result.current.isSuccess).toBe(false);
  });
});
