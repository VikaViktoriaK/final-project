"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  AccountCircleOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import useLogout from "@/features/auth/hooks/use-logout";
import { usePreferences } from "@/lib/preferences/PreferencesProvider";

export default function UserMenu() {
  const router = useRouter();
  const { logoutUser } = useLogout();
  const { t } = usePreferences();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logoutUser();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{ width: 32, height: 32, bgcolor: "var(--color-primary)" }}
        />
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "var(--color-bg-secondary)",
            color: "var(--app-text)",
            minWidth: 180,
            mt: 1,
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
          },
          "& .MuiMenuItem-root": {
            py: 1.5,
            px: 2,
            transition: "background-color 0.2s",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.05)",
            },
          },
          "& .MuiListItemIcon-root": {
            color: "var(--app-text)",
            minWidth: 36,
          },
        }}
      >
        <MenuItem onClick={() => router.push("/profile")}>
          <ListItemIcon>
            <AccountCircleOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("nav.profile")} />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            router.push("/settings");
          }}
        >
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("nav.settings")} />
        </MenuItem>

        <Divider sx={{ borderColor: "var(--app-control-border)", my: 0.5 }} />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t("nav.logout")} />
        </MenuItem>
      </Menu>
    </>
  );
}
