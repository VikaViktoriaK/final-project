import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "@/i18n/use-translation";
import { catalogTableSx } from "@/shared/styles/catalogTable.styles";

export type CatalogRowActionsMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  showEdit?: boolean;
};

export function CatalogRowActionsMenu({
  anchorEl,
  open,
  onClose,
  onEdit,
  onDelete,
  showEdit = true,
}: CatalogRowActionsMenuProps) {
  const { t } = useTranslation();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={catalogTableSx.rowMenu}
    >
      {showEdit ? (
        <MenuItem
          onClick={() => {
            onClose();
            onEdit();
          }}
        >
          {t("common.edit")}
        </MenuItem>
      ) : null}
      <MenuItem
        onClick={() => {
          onClose();
          onDelete();
        }}
        sx={catalogTableSx.rowMenuDeleteItem}
      >
        {t("common.delete")}
      </MenuItem>
    </Menu>
  );
}
