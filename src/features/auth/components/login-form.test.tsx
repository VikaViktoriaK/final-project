/**
 * Template for form tests — copy patterns to registration-form.test.tsx etc.
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginForm from "./login-form";

const mockLoginUser = jest.fn();

jest.mock("../hooks/use-login", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loading: false,
    error: null,
    loginUser: mockLoginUser,
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

function renderLoginForm() {
  const theme = createTheme({ palette: { mode: "dark" } });
  return render(
    <ThemeProvider theme={theme}>
      <LoginForm />
    </ThemeProvider>,
  );
}

describe("LoginForm", () => {
  beforeEach(() => {
    mockLoginUser.mockClear();
  });

  it("shows email validation error after submit with invalid email", async () => {
    renderLoginForm();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password1" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address."),
      ).toBeInTheDocument();
    });

    expect(mockLoginUser).not.toHaveBeenCalled();
  });
});
