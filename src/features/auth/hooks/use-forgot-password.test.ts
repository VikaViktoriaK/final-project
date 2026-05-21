import { act, renderHook } from "@testing-library/react";
import useForgotPassword from "./use-forgot-password";

const mockForgotPassword = jest.fn();

jest.mock("@apollo/client/react", () => ({
  useMutation: () => [mockForgotPassword, { loading: false, error: null }],
}));

describe("useForgotPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets isSuccess after mutation succeeds", async () => {
    mockForgotPassword.mockResolvedValue({ data: { forgotPassword: true } });

    const { result } = renderHook(() => useForgotPassword());

    expect(result.current.isSuccess).toBe(false);

    await act(async () => {
      await result.current.forgotPasswordUser({ email: "user@example.com" });
    });

    expect(mockForgotPassword).toHaveBeenCalledWith({
      variables: { auth: { email: "user@example.com" } },
    });
    expect(result.current.isSuccess).toBe(true);
  });

  it("keeps isSuccess false when mutation throws", async () => {
    mockForgotPassword.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useForgotPassword());

    await act(async () => {
      await result.current.forgotPasswordUser({ email: "user@example.com" });
    });

    expect(result.current.isSuccess).toBe(false);
  });
});
