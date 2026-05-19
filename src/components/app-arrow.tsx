import { Box, type SxProps, type Theme } from "@mui/material";

export type AppArrowDirection = "up" | "right" | "down" | "left";

const DIRECTION_ROTATE: Record<AppArrowDirection, string> = {
  up: "rotate(0deg)",
  right: "rotate(90deg)",
  down: "rotate(180deg)",
  left: "rotate(-90deg)",
};

type AppArrowProps = {
  /** Base asset points up; other directions use CSS rotate. */
  direction?: AppArrowDirection;
  size?: number;
  className?: string;
  sx?: SxProps<Theme>;
};

/** Arrow graphic from `/public/arrow.png`. */
function AppArrow({
  direction = "up",
  size = 16,
  className,
  sx,
}: AppArrowProps) {
  return (
    <Box
      component="span"
      className={className}
      aria-hidden
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        flexShrink: 0,
        transform: DIRECTION_ROTATE[direction],
        transition: "transform 0.2s",
        ...sx,
      }}
    >
      <Box
        component="img"
        src="/arrow.png"
        alt=""
        sx={{
          width: size,
          height: size,
          display: "block",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}

/** For MUI `TableSortLabel` — icon points up; MUI rotates for `desc`. */
function TableSortArrowIcon({ className }: { className?: string }) {
  return (
    <Box
      component="span"
      className={className}
      aria-hidden
      sx={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 0,
      }}
    >
      <Box
        component="img"
        src="/arrow.png"
        alt=""
        sx={{ width: 18, height: 18, display: "block", objectFit: "contain" }}
      />
    </Box>
  );
}

export { TableSortArrowIcon };
export default AppArrow;
