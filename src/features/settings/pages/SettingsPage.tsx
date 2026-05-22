"use client";

import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { usePreferences } from "@/lib/preferences/PreferencesProvider";
import type { AppearancePreference, Locale } from "@/lib/preferences/types";
import { settingsPageSx } from "../styles/settings.styles";

function SettingsPage() {
  const { appearance, setAppearance, locale, setLocale, t } = usePreferences();

  return (
    <Stack sx={settingsPageSx.root} spacing={3}>
      <Typography component="h1" sx={settingsPageSx.title}>
        {t("settings.title")}
      </Typography>

      <TextField
        select
        label={t("settings.appearance")}
        value={appearance}
        onChange={(event) =>
          setAppearance(event.target.value as AppearancePreference)
        }
        sx={settingsPageSx.field}
      >
        <MenuItem value="system">{t("settings.appearance.system")}</MenuItem>
        <MenuItem value="dark">{t("settings.appearance.dark")}</MenuItem>
        <MenuItem value="light">{t("settings.appearance.light")}</MenuItem>
      </TextField>

      <TextField
        select
        label={t("settings.language")}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        sx={settingsPageSx.field}
      >
        <MenuItem value="en">{t("settings.language.en")}</MenuItem>
        <MenuItem value="ru">{t("settings.language.ru")}</MenuItem>
        <MenuItem value="de">{t("settings.language.de")}</MenuItem>
      </TextField>
    </Stack>
  );
}

export default SettingsPage;
