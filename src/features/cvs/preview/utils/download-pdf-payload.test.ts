import {
  downloadPdfPayload,
  isServerPdfUnavailable,
} from "./download-pdf-payload";

describe("download-pdf-payload", () => {
  describe("isServerPdfUnavailable", () => {
    it("detects puppeteer and transport failures", () => {
      expect(isServerPdfUnavailable("puppeteer launch failed")).toBe(true);
      expect(isServerPdfUnavailable("browserWSEndpoint missing")).toBe(true);
      expect(isServerPdfUnavailable("Bad Request Exception")).toBe(true);
    });

    it("returns false for unrelated errors", () => {
      expect(isServerPdfUnavailable("Network error")).toBe(false);
    });
  });

  describe("downloadPdfPayload", () => {
    it("creates a download link and triggers click", () => {
      const click = jest.fn();
      const link = {
        download: "",
        href: "",
        click,
      } as unknown as HTMLAnchorElement;
      const createElement = jest
        .spyOn(document, "createElement")
        .mockReturnValue(link);

      downloadPdfPayload(
        "data:application/pdf;base64,abc",
        "Jane-Developer.pdf",
      );

      expect(createElement).toHaveBeenCalledWith("a");
      expect(link.download).toBe("Jane-Developer.pdf");
      expect(link.href).toBe("data:application/pdf;base64,abc");
      expect(click).toHaveBeenCalled();

      createElement.mockRestore();
    });

    it("wraps raw base64 payload in data URL", () => {
      const click = jest.fn();
      const link = {
        download: "",
        href: "",
        click,
      } as unknown as HTMLAnchorElement;
      jest.spyOn(document, "createElement").mockReturnValue(link);

      downloadPdfPayload("YWJj", "cv.pdf");

      expect(link.href).toBe("data:application/pdf;base64,YWJj");

      jest.restoreAllMocks();
    });
  });
});
