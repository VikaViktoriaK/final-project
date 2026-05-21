import { screen, waitFor } from "@testing-library/react";
import LoginForm from "./login-form";
import useLogin from "../hooks/use-login";
import {
  renderWithTheme,
  typeIntoPlaceholder,
} from "../test-utils/render-with-theme";

const mockLoginUser = jest.fn();

jest.mock("../hooks/use-login", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const useLoginMock = jest.mocked(useLogin);

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

describe("LoginForm", () => {
  beforeEach(() => {
    mockLoginUser.mockClear();
    useLoginMock.mockReturnValue({
      loading: false,
      error: null,
      loginUser: mockLoginUser,
    });
  });

  it("renders sign in form", () => {
    renderWithTheme(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: "Sign in" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    const { user } = renderWithTheme(<LoginForm />);

    await typeIntoPlaceholder(user, "Email", "not-an-email");
    await typeIntoPlaceholder(user, "Password", "password1");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address."),
      ).toBeInTheDocument();
    });

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  it("shows password validation error for short password", async () => {
    const { user } = renderWithTheme(<LoginForm />);

    await typeIntoPlaceholder(user, "Email", "user@example.com");
    await typeIntoPlaceholder(user, "Password", "short");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long."),
      ).toBeInTheDocument();
    });

    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  it("shows server error from hook", () => {
    useLoginMock.mockReturnValue({
      loading: false,
      error: { message: "Invalid credentials" },
      loginUser: mockLoginUser,
    });

    renderWithTheme(<LoginForm />);

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("disables submit button while loading", () => {
    useLoginMock.mockReturnValue({
      loading: true,
      error: null,
      loginUser: mockLoginUser,
    });

    renderWithTheme(<LoginForm />);

    const submitButtons = screen.getAllByRole("button", { hidden: true });
    const formSubmit = submitButtons.find(
      (button) => button.getAttribute("type") === "submit",
    );
    expect(formSubmit).toBeDisabled();
  });
});
