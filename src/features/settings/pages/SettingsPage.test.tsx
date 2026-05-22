import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import SettingsPage from "./SettingsPage";

function renderSettings() {
  return renderWithTheme(<SettingsPage />);
}

describe("SettingsPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders appearance and language controls", () => {
    renderSettings();

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByLabelText("Appearance")).toBeInTheDocument();
    expect(screen.getByLabelText("Language")).toBeInTheDocument();
  });

  it("persists light appearance selection", () => {
    renderSettings();

    fireEvent.mouseDown(screen.getByLabelText("Appearance"));
    fireEvent.click(screen.getByRole("option", { name: "Light" }));

    expect(window.localStorage.getItem("hrm_appearance")).toBe("light");
  });

  it("persists Russian locale", () => {
    renderSettings();

    fireEvent.mouseDown(screen.getByLabelText("Language"));
    fireEvent.click(screen.getByRole("option", { name: "Russian" }));

    expect(window.localStorage.getItem("hrm_locale")).toBe("ru");
    expect(screen.getByText("Настройки")).toBeInTheDocument();
  });
});
