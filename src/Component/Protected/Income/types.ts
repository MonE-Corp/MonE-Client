export interface Income {
  income_id: number;
  amount: number;
  source: string;
  description?: string;
  tax?: number;
  cpp?: number;
  ei?: number;
  date: string;
  income_type:string; 
}

export type CreateIncome = {
  amount: number;
  source: string;
  description?: string;
  tax?: number;
  cpp?: number;
  ei?: number;
  date: string;
  income_type:string;
};
