import { act, renderHook } from "@testing-library/react";
import { usePositionsPage } from "./usePositionsPage";

const mockCreatePosition = jest.fn();
const mockUpdatePosition = jest.fn();
const mockDeletePosition = jest.fn();
const mockRefetch = jest.fn();

jest.mock(
  "@/features/auth/lib/auth-storage",
  () => ({
    useAuthSnapshot: jest.fn(() => ({ role: "Admin" })),
  }),
  { virtual: true },
);

jest.mock("../api/positions", () => ({
  usePositionsQuery: jest.fn(() => ({
    positions: [
      { id: "2", name: "Developer" },
      { id: "1", name: "Designer" },
    ],
    loading: false,
    error: null,
    refetch: mockRefetch,
  })),
  useCreatePositionMutation: jest.fn(() => [
    mockCreatePosition,
    { loading: false },
  ]),
  useUpdatePositionMutation: jest.fn(() => [
    mockUpdatePosition,
    { loading: false },
  ]),
  useDeletePositionMutation: jest.fn(() => [
    mockDeletePosition,
    { loading: false },
  ]),
}));

describe("usePositionsPage", () => {
  beforeEach(() => {
    const payload = btoa(JSON.stringify({ role: "Admin" }));
    localStorage.setItem("hrm_access_token", `header.${payload}.signature`);
    jest.clearAllMocks();
    mockCreatePosition.mockResolvedValue({});
    mockUpdatePosition.mockResolvedValue({});
    mockDeletePosition.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  it("sorts positions and exposes admin state", () => {
    const { result } = renderHook(() => usePositionsPage());

    expect(result.current.isAdmin).toBe(true);
    expect(result.current.processedPositions.map((item) => item.name)).toEqual([
      "Designer",
      "Developer",
    ]);
  });

  it("creates, updates, and deletes positions", async () => {
    const { result } = renderHook(() => usePositionsPage());

    await act(async () => {
      await result.current.handleFormSubmit("QA Engineer");
    });
    expect(mockCreatePosition).toHaveBeenCalledWith({
      variables: { position: { name: "QA Engineer" } },
    });

    act(() => result.current.form.openEdit({ id: "2", name: "Developer" }));
    await act(async () => {
      await result.current.handleFormSubmit("Lead Developer");
    });
    expect(mockUpdatePosition).toHaveBeenCalledWith({
      variables: { position: { positionId: "2", name: "Lead Developer" } },
    });

    act(() =>
      result.current.deleteDialog.requestDelete({ id: "1", name: "Designer" }),
    );
    await act(async () => {
      await result.current.handleDeleteConfirm();
    });
    expect(mockDeletePosition).toHaveBeenCalledWith({
      variables: { position: { positionId: "1" } },
    });
    expect(mockRefetch).toHaveBeenCalledTimes(3);
  });
});
