import { act, renderHook } from "@testing-library/react";
import { useBulkSelection } from "./useBulkSelection";

describe("useBulkSelection", () => {
  it("toggles selected keys and tracks count", () => {
    const { result } = renderHook(() =>
      useBulkSelection<{ id: string }>((item) => item.id),
    );

    act(() => result.current.startRemoveMode());
    act(() => result.current.toggleSelected({ id: "1" }));
    act(() => result.current.toggleSelected({ id: "2" }));

    expect(result.current.removeMode).toBe(true);
    expect(result.current.selectedCount).toBe(2);

    act(() => result.current.toggleSelected({ id: "1" }));
    expect(result.current.selectedCount).toBe(1);
  });

  it("exits remove mode and clears selection state", () => {
    const { result } = renderHook(() =>
      useBulkSelection<{ id: string }>((item) => item.id),
    );

    act(() => result.current.startRemoveMode());
    act(() => result.current.toggleSelected({ id: "1" }));
    act(() => {
      result.current.setConfirmOpen(true);
      result.current.setError("Failed");
    });
    act(() => result.current.exitRemoveMode());

    expect(result.current.removeMode).toBe(false);
    expect(result.current.selectedCount).toBe(0);
    expect(result.current.confirmOpen).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
