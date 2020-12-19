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

export interface YearlyBudgetsList {
  year: string;
  yearly_total_budget: number;
  monthly_budgets: MonthlyBudgetsList;
}

export interface CurrentMonthBudgetStatus {
  label: string;
  percentage: number;
  remainingBudget: number;
  remainingBudgetMessage: string;
  totalExpense: string;
}

export interface CurrentMonthBudgetStatusList extends Array<CurrentMonthBudgetStatus> {}

export interface StandardBudgetsListRes {
  standard_budgets: Budget[];
}
export interface StandardBudgetsList extends Array<Budget> {}
export interface MonthlyBudgetsList extends Array<MonthlyBudget> {}
export interface CustomBudgetsList extends Array<Budget> {}

export interface fetchStandardBudgetsRes {
  standard_budgets: [];
}

export interface fetchCustomBudgetsRes {
  custom_budgets: [];
}

export interface BudgetReq {
  big_category_id: number;
  budget: number;
}
export interface CustomBudgetsRes {
  custom_budgets: Budget[];
}

export interface MonthBudget {
  monthly_budgets: MonthlyBudget[];
}

export interface DeleteCustomBudgetsRes {
  message: string;
}

export interface BudgetsReq extends Array<BudgetReq> {}
