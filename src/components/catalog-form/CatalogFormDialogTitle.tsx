"use client";

import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { userLanguagesSx } from "@/features/users/components/user-profile/userLanguages.styles";

type CatalogFormDialogTitleProps = {
  title: string;
  onClose: () => void;
};

export function CatalogFormDialogTitle({
  title,
  onClose,
}: CatalogFormDialogTitleProps) {
  return (
    <DialogTitle
      component="div"
      sx={userLanguagesSx.addLanguageDialogTitleRoot}
    >
      <Box sx={userLanguagesSx.dialogTitleRow}>
        <Box component="span" sx={userLanguagesSx.dialogTitleText}>
          {title}
        </Box>
        <IconButton
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          size="small"
          sx={userLanguagesSx.dialogCloseBtn}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>
  );
}
