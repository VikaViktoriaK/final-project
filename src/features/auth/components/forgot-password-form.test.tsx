import { screen, waitFor } from "@testing-library/react";
import ForgotPasswordForm from "./forgot-password-form";
import {
  renderWithTheme,
  typeIntoPlaceholder,
} from "../test-utils/render-with-theme";

const mockForgotPasswordUser = jest.fn();

jest.mock("../hooks/use-forgot-password", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loading: false,
    error: null,
    isSuccess: false,
    forgotPasswordUser: mockForgotPasswordUser,
  })),
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

describe("ForgotPasswordForm", () => {
  beforeEach(() => {
    mockForgotPasswordUser.mockClear();
  });

  it("renders forgot password form", () => {
    renderWithTheme(<ForgotPasswordForm />);

    expect(
      screen.getByRole("heading", { name: "Forgot password" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Forgot password" }),
    ).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    const { user } = renderWithTheme(<ForgotPasswordForm />);

    await typeIntoPlaceholder(user, "Email", "bad-email");
    await user.click(screen.getByRole("button", { name: "Forgot password" }));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address."),
      ).toBeInTheDocument();
    });

    expect(mockForgotPasswordUser).not.toHaveBeenCalled();
  });

  it("shows success message when isSuccess is true", () => {
    const useForgotPassword = jest.requireMock("../hooks/use-forgot-password")
      .default as jest.Mock;
    useForgotPassword.mockReturnValue({
      loading: false,
      error: null,
      isSuccess: true,
      forgotPasswordUser: mockForgotPasswordUser,
    });

    renderWithTheme(<ForgotPasswordForm />);

    expect(
      screen.getByText(/password reset instructions have been sent/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sent" })).toBeDisabled();
  });
});
