// features/expenses/api.ts
import { Expense, CreateExpense } from "./types";

const BASE = "http://localhost:5000/api/expenses";

export const fetchExpenses = async (token: string): Promise<Expense[]> => {
  const res = await fetch(BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw new Error("UNAUTHORIZED");
  return res.json();
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
    body: JSON.stringify(expense),
  });

  return res.json();
};

export const updateExpense = async (
  token: string,
  id: number,
  data: Partial<Expense>
) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteExpense = async (token: string, id: number) => {
  await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
