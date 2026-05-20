import { Box } from "@mui/material";
import { cvsStyles } from "@/features/cvs/styles/cvs.styles";
import type { ConfirmHighlightProps } from "./types";

function ConfirmHighlight({ children }: ConfirmHighlightProps) {
  return (
    <Box component="strong" sx={cvsStyles.confirmHighlight}>
      {children}
    </Box>
  );
}

export default ConfirmHighlight;
