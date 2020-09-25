export interface FetchStandardBudgets {
  big_category_id: number;
  big_category_name: string;
  budget: number;
}

export interface MonthlyBudget {
  month: string;
  budget_type: string;
  monthly_total_budget: number;
}

export interface FetchYearlyBudget {
  year: Date;
  yearly_total_budget: number;
  monthly_budgets: MonthlyBudget;
}

export interface StandardBudgetsList extends Array<FetchStandardBudgets> {}
export interface MonthlyBudgetsList extends Array<MonthlyBudget> {}
export interface FetchYearlyBudgetsList extends Array<FetchYearlyBudget> {}
