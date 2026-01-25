// features/investments/api.ts
import { Investment, CreateInvestment } from "./types";

const BASE = "https://mone-awhhcwb7baccf5g0.canadacentral-01.azurewebsites.net/api/investment";

/* ---------------- Date Helpers ---------------- */
const toDateOnly = (value?: string) => {
  if (!value) return value;
  return value.split("T")[0]; // "2026-01-02"
};

const toISODate = (value?: string) => {
  if (!value) return value;
  return `${value}T00:00:00.000Z`;
};

/* ---------------- API Calls ---------------- */

export const fetchInvestments = async (token: string): Promise<Investment[]> => {
  const res = await fetch(BASE, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 401) throw new Error("UNAUTHORIZED");

  const data: Investment[] = await res.json();
  return data.map((i) => ({ ...i, invested_date: toDateOnly(i.invested_date)! }));
};

export const addInvestment = async (token: string, inv: CreateInvestment): Promise<Investment> => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...inv, invested_date: toISODate(inv.invested_date) }),
  });
  const data: Investment = await res.json();
  return { ...data, invested_date: toDateOnly(data.invested_date)! };
};

export const updateInvestment = async (token: string, id: number, data: Partial<Investment>): Promise<Investment> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, invested_date: toISODate(data.invested_date) }),
  });
  const updated: Investment = await res.json();
  return { ...updated, invested_date: toDateOnly(updated.invested_date)! };
};

export const deleteInvestment = async (token: string, id: number) => {
  await fetch(`${BASE}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
};
