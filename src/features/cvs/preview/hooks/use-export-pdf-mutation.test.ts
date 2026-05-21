import { act, renderHook } from "@testing-library/react";
import { mockCv } from "../../test-utils/fixtures";
import useExportPdfMutation from "./use-export-pdf-mutation";

const mockExportPdfMutation = jest.fn();
const mockDownloadPdfPayload = jest.fn();
const mockExportCvPdfClient = jest.fn();
const mockExportCvPdfFromElement = jest.fn();

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("../../skills/hooks/use-cv-skill-mutations", () => ({
  useCvSkillCatalog: () => ({ categories: [] }),
}));

jest.mock("../utils/download-pdf-payload", () => ({
  downloadPdfPayload: (...args: unknown[]) => mockDownloadPdfPayload(...args),
  isServerPdfUnavailable: (message: string) => /puppeteer/i.test(message),
}));

jest.mock("../utils/export-cv-pdf-client", () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockExportCvPdfClient(...args),
  exportCvPdfFromElement: (...args: unknown[]) =>
    mockExportCvPdfFromElement(...args),
}));

const { useMutation } = jest.requireMock("@apollo/client/react") as {
  useMutation: jest.Mock;
};

describe("useExportPdfMutation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useMutation.mockReturnValue([mockExportPdfMutation, { loading: false }]);
    mockExportCvPdfClient.mockResolvedValue(undefined);
    mockExportCvPdfFromElement.mockResolvedValue(undefined);
  });

  it("downloads PDF from server payload on success", async () => {
    mockExportPdfMutation.mockResolvedValue({
      data: { exportPdf: "data:application/pdf;base64,abc" },
    });

    const { result } = renderHook(() => useExportPdfMutation());

    let exportResult: { ok: boolean };
    await act(async () => {
      exportResult = await result.current.exportPdf(mockCv);
    });

    expect(exportResult!.ok).toBe(true);
    expect(mockDownloadPdfPayload).toHaveBeenCalledWith(
      "data:application/pdf;base64,abc",
      "Jane-Developer.pdf",
    );
    expect(mockExportCvPdfClient).not.toHaveBeenCalled();
  });

  it("falls back to client export when server PDF is unavailable", async () => {
    mockExportPdfMutation.mockRejectedValue(new Error("puppeteer failed"));

    const { result } = renderHook(() => useExportPdfMutation());

    let exportResult: { ok: boolean };
    await act(async () => {
      exportResult = await result.current.exportPdf(mockCv);
    });

    expect(exportResult!.ok).toBe(true);
    expect(mockExportCvPdfClient).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: "Jane-Developer.pdf",
        html: expect.stringContaining("Jane Developer"),
      }),
    );
  });

  it("exports from preview element when provided", async () => {
    mockExportPdfMutation.mockRejectedValue(new Error("puppeteer failed"));
    const element = document.createElement("div");

    const { result } = renderHook(() => useExportPdfMutation());

    await act(async () => {
      await result.current.exportPdf(mockCv, element);
    });

    expect(mockExportCvPdfFromElement).toHaveBeenCalledWith({
      element,
      fileName: "Jane-Developer.pdf",
    });
    expect(mockExportCvPdfClient).not.toHaveBeenCalled();
  });
});
