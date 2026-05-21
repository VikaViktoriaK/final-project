import { Box } from "@mui/material";

type AppSearchIconProps = {
  size?: number;
};

/** Search graphic from `/public/search.png`. */
function AppSearchIcon({ size = 16 }: AppSearchIconProps) {
  return (
    <Box
      component="img"
      src="/search.png"
      alt=""
      aria-hidden
      sx={{
        width: size,
        height: size,
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}

export default AppSearchIcon;
