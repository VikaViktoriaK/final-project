import { gql } from "@apollo/client";

export const EXPORT_PDF_MUTATION = gql`
  mutation ExportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`;
