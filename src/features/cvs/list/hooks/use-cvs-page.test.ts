import { act, renderHook } from "@testing-library/react";
import { mockCv, mockCvUser } from "../../test-utils/fixtures";
import useCvsPage from "./use-cvs-page";

const mockPush = jest.fn();
const mockCreateCv = jest.fn();
const mockDeleteCv = jest.fn();
const mockShowSuccess = jest.fn();
const mockShowError = jest.fn();

const secondCv = {
  ...mockCv,
  id: "cv-2",
  name: "Alice Analyst",
  user: { id: "user-2", email: "alice@example.com" },
};

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("./use-cvs", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./use-cv-list-mutations", () => ({
  useCreateCvMutation: jest.fn(),
  useDeleteCvMutation: jest.fn(),
}));

jest.mock("../../../../hooks/use-search", () => ({
  __esModule: true,
  default: () => ({
    query: "",
    onChange: jest.fn(),
  }),
}));

jest.mock("../../../../hooks/use-dialog", () => ({
  __esModule: true,
  default: () => ({
    isOpen: false,
    payload: null,
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

jest.mock("../../../../hooks/use-anchored-menu", () => ({
  __esModule: true,
  default: () => ({
    anchor: null,
    item: null,
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

jest.mock("../../../../hooks/use-action-feedback", () => ({
  __esModule: true,
  default: () => ({
    showSuccess: mockShowSuccess,
    showError: mockShowError,
    FeedbackSnackbar: null,
  }),
}));

const useCvs = jest.requireMock("./use-cvs").default as jest.Mock;
const { useCreateCvMutation, useDeleteCvMutation } = jest.requireMock(
  "./use-cv-list-mutations",
) as {
  useCreateCvMutation: jest.Mock;
  useDeleteCvMutation: jest.Mock;
};

describe("useCvsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCvs.mockReturnValue({
      data: { cvs: [mockCv, secondCv] },
      loading: false,
      error: undefined,
    });
    useCreateCvMutation.mockReturnValue({
      createCv: mockCreateCv,
      loading: false,
    });
    useDeleteCvMutation.mockReturnValue({
      deleteCv: mockDeleteCv,
      loading: false,
    });
  });

  it("sorts CVs by name ascending by default", () => {
    const { result } = renderHook(() => useCvsPage());

    expect(result.current.cvs.map((cv) => cv.name)).toEqual([
      "Alice Analyst",
      "Jane Developer",
    ]);
    expect(result.current.sortField).toBe("name");
    expect(result.current.sortDirection).toBe("asc");
  });

  it("toggles sort direction when sorting the same field", () => {
    const { result } = renderHook(() => useCvsPage());

    act(() => {
      result.current.handleSort("name");
    });

    expect(result.current.sortDirection).toBe("desc");
    expect(result.current.cvs[0].name).toBe("Jane Developer");
  });

  it("reports empty list state", () => {
    useCvs.mockReturnValue({
      data: { cvs: [] },
      loading: false,
      error: undefined,
    });

    const { result } = renderHook(() => useCvsPage());

    expect(result.current.isEmpty).toBe(true);
  });

  it("exposes employee email from CV user", () => {
    const { result } = renderHook(() => useCvsPage());

    expect(result.current.cvs[1].user?.email).toBe(mockCvUser.email);
  });
});
