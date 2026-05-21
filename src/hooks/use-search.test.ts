import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent } from "react";
import useSearch from "./use-search";

describe("useSearch", () => {
  it("updates query from input change events", () => {
    const { result } = renderHook(() => useSearch("initial"));

    expect(result.current.query).toBe("initial");

    act(() =>
      result.current.onChange({
        target: { value: "react" },
      } as ChangeEvent<HTMLInputElement>),
    );
    expect(result.current.query).toBe("react");

    act(() => result.current.setQuery("node"));
    expect(result.current.query).toBe("node");
  });
});
