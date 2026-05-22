import { act, renderHook } from "@testing-library/react";
import { mockCv } from "../../test-utils/fixtures";
import { createMockCvContextValue } from "../../test-utils/mock-cv-context";
import { useCvContext } from "../../shared/context/cv-context";
import useExportPdfMutation from "./use-export-pdf-mutation";
import useCvPreviewPage from "./use-cv-preview-page";

const mockExportPdf = jest.fn();
const mockShowSuccess = jest.fn();
const mockShowError = jest.fn();

jest.mock("../../shared/context/cv-context", () => ({
  useCvContext: jest.fn(),
}));

jest.mock("../../skills/hooks/use-cv-skill-mutations", () => ({
  useCvSkillCatalog: () => ({ categories: [] }),
}));

jest.mock("./use-export-pdf-mutation", () => ({
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
const useExportPdfMutationMock = jest.mocked(useExportPdfMutation);

describe("useCvPreviewPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCvContextMock.mockReturnValue(createMockCvContextValue());
    useExportPdfMutationMock.mockReturnValue({
      exportPdf: mockExportPdf,
      loading: false,
    });
  });

  it("groups skills for preview", () => {
    const { result } = renderHook(() => useCvPreviewPage());

    expect(result.current.cv).toEqual(mockCv);
    expect(result.current.groupedSkills.length).toBeGreaterThan(0);
  });

  it("shows success when PDF export succeeds", async () => {
    mockExportPdf.mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useCvPreviewPage());

    await act(async () => {
      await result.current.handleExportPdf();
    });

    expect(mockExportPdf).toHaveBeenCalledWith(mockCv, undefined);
    expect(mockShowSuccess).toHaveBeenCalledWith("PDF exported");
  });

  it("shows error when PDF export fails", async () => {
    mockExportPdf.mockResolvedValue({ ok: false, message: "Export failed" });

    const { result } = renderHook(() => useCvPreviewPage());

    await act(async () => {
      await result.current.handleExportPdf();
    });

    expect(mockShowError).toHaveBeenCalledWith("Export failed");
  });
});
