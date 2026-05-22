import { act, renderHook } from "@testing-library/react";
import type { MouseEvent } from "react";
import useAnchoredMenu from "./use-anchored-menu";

describe("useAnchoredMenu", () => {
  it("opens with anchor element and item, then closes", () => {
    const { result } = renderHook(() => useAnchoredMenu<{ id: string }>());
    const button = document.createElement("button");
    document.body.appendChild(button);

    act(() =>
      result.current.open(
        { currentTarget: button } as unknown as MouseEvent<HTMLElement>,
        { id: "1" },
      ),
    );

    expect(result.current.isOpen).toBe(true);
    expect(result.current.item).toEqual({ id: "1" });
    expect(result.current.anchorEl).toBe(button);

    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.item).toBeNull();
  });
});
