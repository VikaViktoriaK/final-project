"use client";

import { useState } from "react";

function useDialog<T = null>() {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<T | null>(null);

  const open = (value?: T) => {
    setIsOpen(true);
    if (value !== undefined) {
      setPayload(value);
    }
  };

  const close = () => {
    setIsOpen(false);
    setPayload(null);
  };

  return { isOpen, payload, open, close };
}

export default useDialog;
