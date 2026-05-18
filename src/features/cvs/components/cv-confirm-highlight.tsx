import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { cvsStyles } from "../styles/cvs.styles";

type CvConfirmHighlightProps = {
  children: ReactNode;
};

function CvConfirmHighlight({ children }: CvConfirmHighlightProps) {
  return (
    <Box component="strong" sx={cvsStyles.confirmHighlight}>
      {children}
    </Box>
  );
}

export default CvConfirmHighlight;
