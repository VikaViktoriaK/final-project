import { CV_PREVIEW_CONTENT_WIDTH } from "../constants/cv-preview-layout";

type ExportCvPdfOptions = {
  html: string;
  fileName: string;
};

type ExportCvPdfFromElementOptions = {
  element: HTMLElement;
  fileName: string;
};

const PDF_OPTIONS = {
  margin: [10, 10, 10, 10] as [number, number, number, number],
  image: { type: "jpeg" as const, quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    logging: false,
    letterRendering: true,
  },
  jsPDF: {
    unit: "mm" as const,
    format: "a4" as const,
    orientation: "portrait" as const,
  },
  pagebreak: { mode: ["avoid-all", "css", "legacy"] as const },
};

function waitForIframeLoad(iframe: HTMLIFrameElement): Promise<void> {
  return new Promise((resolve) => {
    iframe.onload = () => resolve();
    window.setTimeout(resolve, 400);
  });
}

async function getHtml2Pdf() {
  return (await import("html2pdf.js")).default;
}

async function exportCvPdfClient({
  html,
  fileName,
}: ExportCvPdfOptions): Promise<void> {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = `position:fixed;left:-99999px;top:0;width:${CV_PREVIEW_CONTENT_WIDTH}px;border:0;visibility:hidden`;
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    document.body.removeChild(iframe);
    throw new Error("Could not prepare PDF document");
  }

  doc.open();
  doc.write(html);
  doc.close();

  await waitForIframeLoad(iframe);

  const html2pdf = await getHtml2Pdf();

  try {
    await html2pdf()
      .set({ ...PDF_OPTIONS, filename: fileName })
      .from(doc.body)
      .save();
  } finally {
    document.body.removeChild(iframe);
  }
}

/** Exports the on-screen preview DOM so PDF matches what the user sees. */
async function exportCvPdfFromElement({
  element,
  fileName,
}: ExportCvPdfFromElementOptions): Promise<void> {
  const html2pdf = await getHtml2Pdf();
  await html2pdf()
    .set({ ...PDF_OPTIONS, filename: fileName })
    .from(element)
    .save();
}

export { exportCvPdfClient, exportCvPdfFromElement };
export default exportCvPdfClient;
