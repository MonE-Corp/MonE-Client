// features/shared/utils/filterEntities.ts
export interface FilterParams {
  year?: number | "";
  month?: number | "";
  category?: string;
}

export function filterByDateAndCategory<T extends { date: string; category?: string }>(
  data: T[], filters: FilterParams
): T[] {
  return data.filter(item => {
    const d = new Date(item.date);
    if (filters.year && d.getFullYear() !== Number(filters.year)) return false;
    if (filters.month && d.getMonth() + 1 !== Number(filters.month)) return false;
    if (filters.category && item.category !== filters.category) return false;
    return true;
  });
}

export function groupByCategory<T extends { category?: string; amount: number }>(
  data: T[]
): { category: string; amount: number }[] {
  return Object.values(
    data.reduce((acc, item) => {
      if (!item.category) return acc;
      if (!acc[item.category]) acc[item.category] = { category: item.category, amount: 0 };
      acc[item.category].amount += item.amount;
      return acc;
    }, {} as Record<string, { category: string; amount: number }>)
  );
}
