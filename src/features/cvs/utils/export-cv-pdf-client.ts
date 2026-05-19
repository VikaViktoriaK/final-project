type ExportCvPdfOptions = {
  html: string;
  fileName: string;
};

function waitForIframeLoad(iframe: HTMLIFrameElement): Promise<void> {
  return new Promise((resolve) => {
    iframe.onload = () => resolve();
    window.setTimeout(resolve, 300);
  });
}

async function exportCvPdfClient({
  html,
  fileName,
}: ExportCvPdfOptions): Promise<void> {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;left:-99999px;top:0;width:794px;border:0;visibility:hidden";
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

  const html2pdf = (await import("html2pdf.js")).default;

  try {
    await html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(doc.body)
      .save();
  } finally {
    document.body.removeChild(iframe);
  }
}

export default exportCvPdfClient;
