import { act, renderHook } from "@testing-library/react";
import { useDeleteConfirm } from "./useDeleteConfirm";

describe("useDeleteConfirm", () => {
  it("opens confirmation for a target row", () => {
    const row = { id: "1" };
    const { result } = renderHook(() => useDeleteConfirm<typeof row>());

    act(() => result.current.requestDelete(row));

    expect(result.current.open).toBe(true);
    expect(result.current.target).toBe(row);
  });

  it("closes and clears target independently", () => {
    const row = { id: "1" };
    const { result } = renderHook(() => useDeleteConfirm<typeof row>());

    act(() => result.current.requestDelete(row));
    act(() => result.current.close());
    expect(result.current.open).toBe(false);
    expect(result.current.target).toBe(row);

    act(() => result.current.clearTarget());
    expect(result.current.target).toBeNull();
  });
});
