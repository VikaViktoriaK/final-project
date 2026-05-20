export function bulkRemoveMessage(
  selectedCount: number,
  singular: string,
  plural: (count: number) => string,
): string {
  return selectedCount === 1 ? singular : plural(selectedCount);
}
