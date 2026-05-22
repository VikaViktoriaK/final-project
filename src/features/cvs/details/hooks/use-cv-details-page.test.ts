import { act, renderHook, waitFor } from "@testing-library/react";
import { mockCv } from "../../test-utils/fixtures";
import { createMockCvContextValue } from "../../test-utils/mock-cv-context";
import { useCvContext } from "../../shared/context/cv-context";
import useUpdateCvMutation from "./use-update-cv-mutation";
import useCvDetailsPage from "./use-cv-details-page";

const mockUpdateCv = jest.fn();
const mockShowSuccess = jest.fn();
const mockShowError = jest.fn();

jest.mock("../../shared/context/cv-context", () => ({
  useCvContext: jest.fn(),
}));

jest.mock("./use-update-cv-mutation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../../hooks/use-action-feedback", () => ({
  __esModule: true,
  default: () => ({
    showSuccess: mockShowSuccess,
    showError: mockShowError,
    FeedbackSnackbar: null,
  }),
}));

const useCvContextMock = jest.mocked(useCvContext);
const useUpdateCvMutationMock = jest.mocked(useUpdateCvMutation);

describe("useCvDetailsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCvContextMock.mockReturnValue(createMockCvContextValue());
    useUpdateCvMutationMock.mockReturnValue({
      updateCv: mockUpdateCv,
      loading: false,
    });
  });

  it("initializes form from CV data", async () => {
    const { result } = renderHook(() => useCvDetailsPage());

    await waitFor(() => {
      expect(result.current.cv?.name).toBe("Jane Developer");
    });
  });

  it("shows success feedback after update", async () => {
    mockUpdateCv.mockResolvedValue({
      ok: true,
      data: mockCv,
    });

    const { result } = renderHook(() => useCvDetailsPage());

    await waitFor(() => {
      expect(result.current.canEdit).toBe(true);
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockUpdateCv).toHaveBeenCalled();
    expect(mockShowSuccess).toHaveBeenCalledWith("CV updated successfully");
  });

  it("shows error feedback when update fails", async () => {
    mockUpdateCv.mockResolvedValue({
      ok: false,
      message: "Update failed",
    });

    const { result } = renderHook(() => useCvDetailsPage());

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(mockShowError).toHaveBeenCalledWith("Update failed");
  });
});
