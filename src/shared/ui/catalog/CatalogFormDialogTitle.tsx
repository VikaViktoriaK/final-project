import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { formDialogSx } from "@/shared/styles/formDialog.styles";

export type CatalogFormDialogTitleProps = {
  title: string;
  onClose: () => void;
};

export function CatalogFormDialogTitle({
  title,
  onClose,
}: CatalogFormDialogTitleProps) {
  return (
    <DialogTitle component="div" sx={formDialogSx.addLanguageDialogTitleRoot}>
      <Box sx={formDialogSx.dialogTitleRow}>
        <Box component="span" sx={formDialogSx.dialogTitleText}>
          {title}
        </Box>
        <IconButton
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          size="small"
          sx={formDialogSx.dialogCloseBtn}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>
  );
}
