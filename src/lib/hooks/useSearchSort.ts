import * as React from "react";
import { filterAndSortByField, type SortOrder } from "@/lib/search";

export function useSearchSort<T>(items: T[], getField: (item: T) => string) {
  const [query, setQuery] = React.useState("");
  const [order, setOrder] = React.useState<SortOrder>("asc");

  const processed = React.useMemo(
    () => filterAndSortByField(items, query, order, getField),
    [getField, items, order, query],
  );

  const toggleOrder = React.useCallback(() => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  return {
    query,
    setQuery,
    order,
    setOrder,
    processed,
    toggleOrder,
  };
}
