"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";

function useSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return { query, setQuery, onChange };
}

export default useSearch;
