export interface Budget {
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

export interface StandardBudgetsListRes {
  standard_budgets: Budget[];
}
export interface StandardBudgetsList extends Array<Budget> {}
export interface MonthlyBudgetsList extends Array<MonthlyBudget> {}
export interface FetchYearlyBudgetsList extends Array<FetchYearlyBudget> {}
export interface CustomBudgetsList extends Array<Budget> {}

export interface fetchStandardBudgetsRes {
  standard_budgets: [];
}

export interface fetchCustomBudgetsRes {
  custom_budgets: [];
}

export interface editStandardBudgetReq {
  big_category_id: number;
  budget: number;
}

export interface editStandardBudgetsReq extends Array<editStandardBudgetReq> {}
