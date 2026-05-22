import { screen, waitFor } from "@testing-library/react";
import RegistrationForm from "./registration-form";
import {
  renderWithTheme,
  typeIntoPlaceholder,
} from "../test-utils/render-with-theme";

const mockRegisterUser = jest.fn();

jest.mock("../hooks/use-registration", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loading: false,
    error: null,
    registerUser: mockRegisterUser,
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

describe("RegistrationForm", () => {
  beforeEach(() => {
    mockRegisterUser.mockClear();
  });

  it("renders sign up form", () => {
    renderWithTheme(<RegistrationForm />);

    expect(
      screen.getByRole("heading", { name: "Sign up" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });

  it("shows mismatch error when passwords differ", async () => {
    const { user } = renderWithTheme(<RegistrationForm />);

    await typeIntoPlaceholder(user, "Email", "user@example.com");
    await typeIntoPlaceholder(user, "Password", "password1");
    await typeIntoPlaceholder(user, "Confirm Password", "password2");
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    });

    expect(mockRegisterUser).not.toHaveBeenCalled();
  });

  it("shows password length validation error", async () => {
    const { user } = renderWithTheme(<RegistrationForm />);

    await typeIntoPlaceholder(user, "Email", "user@example.com");
    await typeIntoPlaceholder(user, "Password", "short");
    await typeIntoPlaceholder(user, "Confirm Password", "short");
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(
        screen.getAllByText("Password must be at least 8 characters long.")
          .length,
      ).toBeGreaterThan(0);
    });

    expect(mockRegisterUser).not.toHaveBeenCalled();
  });
});
