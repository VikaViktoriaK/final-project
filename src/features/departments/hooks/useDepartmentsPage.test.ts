import { act, renderHook } from "@testing-library/react";
import { useDepartmentsPage } from "./useDepartmentsPage";

const mockCreateDepartment = jest.fn();
const mockUpdateDepartment = jest.fn();
const mockDeleteDepartment = jest.fn();
const mockRefetch = jest.fn();

jest.mock(
  "@/features/auth/lib/auth-storage",
  () => ({
    useAuthSnapshot: jest.fn(() => ({ role: "Admin" })),
  }),
  { virtual: true },
);

jest.mock("../api/departments", () => ({
  useDepartmentsQuery: jest.fn(() => ({
    departments: [
      { id: "2", name: "Engineering" },
      { id: "1", name: "Design" },
    ],
    loading: false,
    error: null,
    refetch: mockRefetch,
  })),
  useCreateDepartmentMutation: jest.fn(() => [
    mockCreateDepartment,
    { loading: false },
  ]),
  useUpdateDepartmentMutation: jest.fn(() => [
    mockUpdateDepartment,
    { loading: false },
  ]),
  useDeleteDepartmentMutation: jest.fn(() => [
    mockDeleteDepartment,
    { loading: false },
  ]),
}));

describe("useDepartmentsPage", () => {
  beforeEach(() => {
    const payload = btoa(JSON.stringify({ role: "Admin" }));
    localStorage.setItem("hrm_access_token", `header.${payload}.signature`);
    jest.clearAllMocks();
    mockCreateDepartment.mockResolvedValue({});
    mockUpdateDepartment.mockResolvedValue({});
    mockDeleteDepartment.mockResolvedValue({});
    mockRefetch.mockResolvedValue({});
  });

  it("exposes admin state and sorted departments", () => {
    const { result } = renderHook(() => useDepartmentsPage());

    expect(result.current.isAdmin).toBe(true);
    expect(
      result.current.processedDepartments.map((item) => item.name),
    ).toEqual(["Design", "Engineering"]);
  });

  it("creates a department and refetches", async () => {
    const { result } = renderHook(() => useDepartmentsPage());

    await act(async () => {
      await result.current.handleFormSubmit("QA");
    });

    expect(mockCreateDepartment).toHaveBeenCalledWith({
      variables: { department: { name: "QA" } },
    });
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("updates selected department in edit mode", async () => {
    const { result } = renderHook(() => useDepartmentsPage());

    act(() => result.current.form.openEdit({ id: "2", name: "Engineering" }));
    await act(async () => {
      await result.current.handleFormSubmit("Platform");
    });

    expect(mockUpdateDepartment).toHaveBeenCalledWith({
      variables: { department: { departmentId: "2", name: "Platform" } },
    });
  });

  it("deletes selected department, closes dialog, and refetches", async () => {
    const { result } = renderHook(() => useDepartmentsPage());

    act(() =>
      result.current.deleteDialog.requestDelete({
        id: "2",
        name: "Engineering",
      }),
    );
    await act(async () => {
      await result.current.handleDeleteConfirm();
    });

    expect(mockDeleteDepartment).toHaveBeenCalledWith({
      variables: { department: { departmentId: "2" } },
    });
    expect(result.current.deleteDialog.open).toBe(false);
    expect(result.current.deleteDialog.target).toBeNull();
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
