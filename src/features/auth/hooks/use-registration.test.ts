import { act, renderHook } from "@testing-library/react";
import useRegistration from "./use-registration";

const mockPush = jest.fn();
const mockSignup = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: () => [mockSignup, { loading: false, error: null }],
}));

describe("useRegistration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to login after successful signup", async () => {
    mockSignup.mockResolvedValue({
      data: { signup: { email: "user@example.com" } },
    });

    const { result } = renderHook(() => useRegistration());

    await act(async () => {
      await result.current.registerUser({
        email: "user@example.com",
        password: "password1",
        confirmPassword: "password1",
      });
    });

    expect(mockSignup).toHaveBeenCalledWith({
      variables: {
        auth: { email: "user@example.com", password: "password1" },
      },
    });
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("does not redirect when signup returns no data", async () => {
    mockSignup.mockResolvedValue({ data: { signup: null } });

    const { result } = renderHook(() => useRegistration());

    await act(async () => {
      await result.current.registerUser({
        email: "user@example.com",
        password: "password1",
        confirmPassword: "password1",
      });
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
