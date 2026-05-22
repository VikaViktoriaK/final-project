export const settingsPageSx = {
  root: {
    width: "100%",
    maxWidth: 720,
    mx: "auto",
    pt: 0.5,
    px: { xs: 2, sm: 3 },
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 400,
    color: "var(--app-text-muted)",
    mb: 4,
    alignSelf: "flex-start",
    width: "100%",
  },
  field: {
    width: "100%",
    minWidth: { xs: "100%", sm: 480 },
    maxWidth: 560,
  },
} as const;
