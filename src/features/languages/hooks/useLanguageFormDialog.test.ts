import { act, renderHook } from "@testing-library/react";
import { TestProviders } from "@/features/auth/test-utils/render-with-theme";
import { useLanguageFormDialog } from "./useLanguageFormDialog";

const wrapper = TestProviders;

describe("useLanguageFormDialog", () => {
  it("submits normalized language values in create mode", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { result } = renderHook(
      () =>
        useLanguageFormDialog({
          mode: "create",
          language: null,
          onClose,
          onSubmit,
        }),
      { wrapper },
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
    const { result } = renderHook(
      () =>
        useLanguageFormDialog({
          mode: "create",
          language: null,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
        }),
      { wrapper },
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

  it("validates required fields", async () => {
    const { result } = renderHook(
      () =>
        useLanguageFormDialog({
          mode: "create",
          language: null,
          onClose: jest.fn(),
          onSubmit: jest.fn(),
        }),
      { wrapper },
    );

    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.submitError).toBe("Enter a language name.");

    act(() => result.current.setName("Spanish"));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.submitError).toBe("Enter a native name.");

    act(() => result.current.setNativeName("Español"));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(result.current.submitError).toBe("Enter an ISO2 code.");
  });

  it("closes edit dialog without submit when values are unchanged", async () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const { result } = renderHook(
      () =>
        useLanguageFormDialog({
          mode: "edit",
          language: {
            id: "1",
            name: "English",
            nativeName: "English",
            iso2: "EN",
          },
          onClose,
          onSubmit,
        }),
      { wrapper },
    );

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("stores submit errors from failed mutations", async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error("Save failed"));
    const { result } = renderHook(
      () =>
        useLanguageFormDialog({
          mode: "create",
          language: null,
          onClose: jest.fn(),
          onSubmit,
        }),
      { wrapper },
    );

    act(() => result.current.setName("Spanish"));
    act(() => result.current.setNativeName("Español"));
    act(() => result.current.setIso2("es"));
    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.submitError).toBe("Save failed");
  });
});
