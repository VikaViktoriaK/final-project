import { act, renderHook } from "@testing-library/react";
import useDialog from "./use-dialog";

describe("useDialog", () => {
  it("opens and closes with optional payload", () => {
    const { result } = renderHook(() => useDialog<string>());

    act(() => result.current.open("edit"));
    expect(result.current.isOpen).toBe(true);
    expect(result.current.payload).toBe("edit");

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.payload).toBeNull();
  });
});
