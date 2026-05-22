import { act, renderHook } from "@testing-library/react";
import { useSearchSort } from "./useSearchSort";

describe("useSearchSort", () => {
  const items = [{ name: "Zulu" }, { name: "Alpha" }, { name: "Beta" }];

  it("sorts items ascending by default", () => {
    const { result } = renderHook(() =>
      useSearchSort(items, (item) => item.name),
    );

    expect(result.current.order).toBe("asc");
    expect(result.current.processed.map((item) => item.name)).toEqual([
      "Alpha",
      "Beta",
      "Zulu",
    ]);
  });

  it("filters by query and toggles order", () => {
    const { result } = renderHook(() =>
      useSearchSort(items, (item) => item.name),
    );

    act(() => result.current.setQuery("a"));
    expect(result.current.processed.map((item) => item.name)).toEqual([
      "Alpha",
      "Beta",
    ]);

    act(() => result.current.toggleOrder());
    expect(result.current.order).toBe("desc");
    expect(result.current.processed.map((item) => item.name)).toEqual([
      "Beta",
      "Alpha",
    ]);
  });
});
