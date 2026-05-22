import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@/features/auth/test-utils/render-with-theme";
import { LanguageFormDialog } from "./LanguageFormDialog";

describe("LanguageFormDialog", () => {
  it("submits normalized language values", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    renderWithTheme(
      <LanguageFormDialog
        open
        mode="create"
        language={null}
        saving={false}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: " Spanish " },
    });
    fireEvent.change(screen.getByLabelText("Native name"), {
      target: { value: " Español " },
    });
    fireEvent.change(screen.getByLabelText("ISO2 code"), {
      target: { value: "es" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Spanish",
        nativeName: "Español",
        iso2: "ES",
      }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows validation error for invalid ISO2 code", async () => {
    renderWithTheme(
      <LanguageFormDialog
        open
        mode="create"
        language={null}
        saving={false}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Spanish" },
    });
    fireEvent.change(screen.getByLabelText("Native name"), {
      target: { value: "Español" },
    });
    fireEvent.change(screen.getByLabelText("ISO2 code"), {
      target: { value: "ESP" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(
      await screen.findByText("ISO2 code must be exactly 2 characters."),
    ).toBeInTheDocument();
  });
});
