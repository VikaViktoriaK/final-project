"use client";

import type { MouseEvent } from "react";
import { useState } from "react";

function useAnchoredMenu<T>() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [item, setItem] = useState<T | null>(null);

  const open = (event: MouseEvent<HTMLElement>, value: T) => {
    setAnchorEl(event.currentTarget);
    setItem(value);
  };

  const close = () => {
    setAnchorEl(null);
    setItem(null);
  };

  return {
    anchorEl,
    item,
    isOpen: Boolean(anchorEl),
    open,
    close,
  };
}

export default useAnchoredMenu;
