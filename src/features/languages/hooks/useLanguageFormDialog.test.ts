import { act, renderHook } from "@testing-library/react";
import { useLanguageFormDialog } from "./useLanguageFormDialog";

describe("useLanguageFormDialog", () => {
  it("submits normalized language values in create mode", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useLanguageFormDialog({
        mode: "create",
        language: null,
        onClose,
        onSubmit,
      }),
    );

    act(() => result.current.setName(" Spanish "));
    act(() => result.current.setNativeName(" Español "));
    act(() => result.current.setIso2("es"));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Spanish",
      nativeName: "Español",
      iso2: "ES",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("sets validation error for invalid ISO2 code", async () => {
    const { result } = renderHook(() =>
      useLanguageFormDialog({
        mode: "create",
        language: null,
        onClose: jest.fn(),
        onSubmit: jest.fn(),
      }),
    );

    act(() => result.current.setName("Spanish"));
    act(() => result.current.setNativeName("Español"));
    act(() => result.current.setIso2("ESP"));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.submitError).toBe(
      "ISO2 code must be exactly 2 characters.",
    );
  });
});
