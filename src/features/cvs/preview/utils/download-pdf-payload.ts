function downloadPdfPayload(payload: string, fileName: string): void {
  const link = document.createElement("a");
  link.download = fileName;

  if (payload.startsWith("data:")) {
    link.href = payload;
  } else if (payload.startsWith("http")) {
    link.href = payload;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = `data:application/pdf;base64,${payload}`;
  }

  link.click();
}

function isServerPdfUnavailable(message: string): boolean {
  return /puppeteer|browserWSEndpoint|browserURL|transport|Bad Request Exception/i.test(
    message,
  );
}

export { downloadPdfPayload, isServerPdfUnavailable };
