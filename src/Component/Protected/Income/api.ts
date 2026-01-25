import { Income, CreateIncome } from "./types";

const BASE = "http://localhost:5000/api/income";

/* Date helpers */

const toDateOnly = (value?: string) => {
  if (!value) return value;
  return value.split("T")[0];
};

export const fetchIncome = async (token: string): Promise<Income[]> => {
  const res = await fetch(BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: Income[] = await res.json();

  return data.map((i) => ({
    ...i,
    date: toDateOnly(i.date)!,
  }));
};

export const addIncome = async (
  token: string,
  income: CreateIncome
): Promise<Income> => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(income), // already YYYY-MM-DD
  });

  const data: Income = await res.json();
  return { ...data, date: toDateOnly(data.date)! };
};

export const updateIncome = async (
  token: string,
  id: number,
  data: Partial<Income>
): Promise<Income> => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const updated: Income = await res.json();
  return { ...updated, date: toDateOnly(updated.date)! };
};

export const deleteIncome = async (token: string, id: number) => {
  await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
