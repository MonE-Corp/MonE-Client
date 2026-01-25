// features/expenses/api.ts
import { Expense, CreateExpense } from "./types";

const BASE = "http://localhost:5000/api/expenses";

/* -------------------- Date Helpers -------------------- */


const toDateOnly = (value?: string) => {
  if (!value) return value;
  return value.split("T")[0]; // "2026-01-02"
};

const toISODate = (value?: string) => {
  if (!value) return value;
  return `${value}T00:00:00.000Z`;
};

/* -------------------- API Calls -------------------- */

export const fetchExpenses = async (token: string): Promise<Expense[]> => {
  const res = await fetch(BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw new Error("UNAUTHORIZED");

  const data: Expense[] = await res.json();

  // Normalize date 
  return data.map((e) => ({
    ...e,
    date: toDateOnly(e.date)!,
  }));
};

export const addExpense = async (
  token: string,
  expense: CreateExpense
): Promise<Expense> => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...expense,
      date: toISODate(expense.date),
    }),
  });

  const data: Expense = await res.json();
  return {
    ...data,
    date: toDateOnly(data.date)!,
  };
};

export const updateExpense = async (
  token: string,
  id: number,
  data: Partial<Expense>
): Promise<Expense> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      date: toISODate(data.date),
    }),
  });

  const updated: Expense = await res.json();
  return {
    ...updated,
    date: toDateOnly(updated.date)!,
  };
};

export const deleteExpense = async (token: string, id: number) => {
  await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
