
export interface Investment {
  investment_id: number;
  type: string;             
  amount: number;
  platform?: string;
  description?: string;
  invested_date: string;     // YYYY-MM-DD
}

export type CreateInvestment = {
  type: string;
  amount: number;
  platform?: string;
  description?: string;
  invested_date: string;     // YYYY-MM-DD
};
