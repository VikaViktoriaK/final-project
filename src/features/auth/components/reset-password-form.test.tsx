import { screen, waitFor } from "@testing-library/react";
import ResetPasswordForm from "./reset-password-form";
import useResetPassword from "../hooks/use-reset-password";
import {
  renderWithTheme,
  typeIntoPlaceholder,
} from "../test-utils/render-with-theme";

const mockResetPasswordUser = jest.fn();

jest.mock("../hooks/use-reset-password", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const useResetPasswordMock = jest.mocked(useResetPassword);

function mockResetPasswordHook(
  overrides: Partial<ReturnType<typeof useResetPassword>> = {},
) {
  useResetPasswordMock.mockReturnValue({
    loading: false,
    error: undefined,
    isSuccess: false,
    token: "reset-token",
    resetPasswordUser: mockResetPasswordUser,
    ...overrides,
  });
}

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    mockResetPasswordUser.mockClear();
    mockResetPasswordHook();
  });

  it("renders reset password form", () => {
    renderWithTheme(<ResetPasswordForm />);

    expect(
      screen.getByRole("heading", { name: "Reset password" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("New Password")).toBeInTheDocument();
  });

  it("shows token required alert when token is missing", () => {
    mockResetPasswordHook({ token: null });

    renderWithTheme(<ResetPasswordForm />);

    expect(screen.getByText("Token is required")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reset Password" }),
    ).toBeDisabled();
  });

  it("shows mismatch error when passwords differ", async () => {
    const { user } = renderWithTheme(<ResetPasswordForm />);

    await typeIntoPlaceholder(user, "New Password", "newpassword1");
    await typeIntoPlaceholder(user, "Confirm New Password", "newpassword2");
    await user.click(screen.getByRole("button", { name: "Reset Password" }));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });

    expect(mockResetPasswordUser).not.toHaveBeenCalled();
  });

  it("shows success alert when isSuccess is true", () => {
    mockResetPasswordHook({ isSuccess: true });

    renderWithTheme(<ResetPasswordForm />);

    expect(
      screen.getByText(/Password reset successfully/i),
    ).toBeInTheDocument();
  });
});
