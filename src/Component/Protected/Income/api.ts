import { Income, CreateIncome } from "./types";

const BASE = "https://mone-awhhcwb7baccf5g0.canadacentral-01.azurewebsites.net/api/income";

/* Date helpers */

const toDateOnly = (value?: string) => {
  if (!value) return value;
  return value.split("T")[0];
};

export const fetchIncome = async (token: string): Promise<Income[]> => {
     // fallback to localStorage if token is null
  const authToken = token || localStorage.getItem("token");
  if (!authToken) throw new Error("No token found");
  const res = await fetch(BASE, {
    headers: { Authorization: `Bearer ${authToken}` },
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

     // fallback to localStorage if token is null
  const authToken = token || localStorage.getItem("token");
  if (!authToken) throw new Error("No token found");

  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
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

     // fallback to localStorage if token is null
  const authToken = token || localStorage.getItem("token");
  if (!authToken) throw new Error("No token found");

  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const updated: Income = await res.json();
  return { ...updated, date: toDateOnly(updated.date)! };
};

export const deleteIncome = async (token: string, id: number) => {
     // fallback to localStorage if token is null
  const authToken = token || localStorage.getItem("token");
  if (!authToken) throw new Error("No token found");
  await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${authToken}` },
  });
};
