
// features/expenses/types.ts
export interface Expense {
  expense_id: number;
  amount: number;
  category: string;
  description?: string;
  payment_type: string;
  date: string;
  bank_institution: string;
  expense_type: string;
}

/**
 * What backend expects when creating a new expense
 * (NO expense_id, but REQUIRED fields)
 */
export type CreateExpense = {
  amount: number;
  category: string;
  payment_type: string;
  date: string;
  description?: string;
  bank_institution: string;
  expense_type: string;
};
