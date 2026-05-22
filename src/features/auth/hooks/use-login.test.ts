import { act, renderHook, waitFor } from "@testing-library/react";
import useLogin from "./use-login";

const mockLogin = jest.fn();
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@apollo/client/react", () => ({
  useLazyQuery: () => [mockLogin, { loading: false, error: null }],
}));

jest.mock("../lib/auth-storage", () => ({
  saveAuthTokens: jest.fn(),
}));

describe("useLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("redirects and saves tokens on successful login", async () => {
    mockLogin.mockResolvedValue({
      data: {
        login: {
          access_token: "access",
          refresh_token: "refresh",
          user: { id: "1", email: "a@b.com", role: "Admin", profile: {} },
        },
      },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.loginUser({
        email: "a@b.com",
        password: "password1",
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/users");
    expect(result.current.error).toBeNull();
  });

  it("sets error state and logs when login throws", async () => {
    mockLogin.mockRejectedValue({
      graphQLErrors: [{ message: "Invalid credentials" }],
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.loginUser({
        email: "a@b.com",
        password: "wrong",
      });
    });

    await waitFor(() => {
      expect(result.current.error?.message).toBe("Invalid credentials");
    });
    expect(console.error).toHaveBeenCalledWith(
      "Error logging in",
      expect.objectContaining({
        graphQLErrors: [{ message: "Invalid credentials" }],
      }),
    );
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("sets error state when login returns no auth result", async () => {
    mockLogin.mockResolvedValue({ data: { login: null } });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.loginUser({
        email: "a@b.com",
        password: "password1",
      });
    });

    await waitFor(() => {
      expect(result.current.error?.message).toBe(
        "Unable to sign in. Please check your credentials and try again.",
      );
    });
    expect(console.error).toHaveBeenCalledWith(
      "Login failed: no auth result returned",
      { data: { login: null } },
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});
