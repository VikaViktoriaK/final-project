import { act, renderHook } from "@testing-library/react";
import { useCrudFormDialog } from "./useCrudFormDialog";

describe("useCrudFormDialog", () => {
  it("opens in create mode and clears the current item", () => {
    const { result } = renderHook(() => useCrudFormDialog<{ id: string }>());

    act(() => result.current.openEdit({ id: "1" }));
    act(() => result.current.openCreate());

    expect(result.current.open).toBe(true);
    expect(result.current.mode).toBe("create");
    expect(result.current.item).toBeNull();
  });

  it("opens in edit mode with selected item and closes", () => {
    const row = { id: "1" };
    const { result } = renderHook(() => useCrudFormDialog<typeof row>());

    act(() => result.current.openEdit(row));
    expect(result.current.open).toBe(true);
    expect(result.current.mode).toBe("edit");
    expect(result.current.item).toBe(row);

    act(() => result.current.close());
    expect(result.current.open).toBe(false);
  });
});
