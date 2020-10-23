export interface GroupBudget {
  big_category_id: number;
  big_category_name: string;
  budget: number;
}

export interface GroupMonthlyBudgets {
  month: string;
  budget_type: string;
  monthly_total_budget: number;
}

export interface GroupYearlyBudgetsList {
  year: string;
  yearly_total_budget: number;
  monthly_budgets: GroupMonthlyBudgetsList;
}

export interface GroupStandardBudgetsList extends Array<GroupBudget> {}
export interface GroupCustomBudgetsList extends Array<GroupBudget> {}
export interface GroupMonthlyBudgetsList extends Array<GroupMonthlyBudgets> {}

export interface GroupStandardBudgetsListRes {
  standard_budgets: GroupBudget[];
}

export interface GroupCustomBudgetsListRes {
  custom_budgets: GroupBudget[];
}

export interface GroupBudgetReq {
  big_category_id: number;
  budget: number;
}

export interface GroupBudgetsReq extends Array<GroupBudgetReq> {}
