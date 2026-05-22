import { act, renderHook } from "@testing-library/react";
import useLogin from "./use-login";
import { saveAuthTokens } from "../lib/auth-storage";

const mockPush = jest.fn();
const mockLogin = jest.fn();

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
  });

  it("saves tokens and redirects on successful login", async () => {
    mockLogin.mockResolvedValue({
      data: {
        login: {
          access_token: "access",
          refresh_token: "refresh",
          user: { id: "1", email: "user@example.com", role: "Employee" },
        },
      },
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.loginUser({
        email: "user@example.com",
        password: "password1",
      });
    });

    expect(mockLogin).toHaveBeenCalledWith({
      variables: { auth: { email: "user@example.com", password: "password1" } },
    });
    expect(saveAuthTokens).toHaveBeenCalledWith(
      "access",
      "refresh",
      expect.objectContaining({ email: "user@example.com" }),
    );
    expect(mockPush).toHaveBeenCalledWith("/users");
  });

  it("does not redirect when login returns no user", async () => {
    mockLogin.mockResolvedValue({ data: { login: null } });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.loginUser({
        email: "user@example.com",
        password: "password1",
      });
    });

    expect(saveAuthTokens).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
