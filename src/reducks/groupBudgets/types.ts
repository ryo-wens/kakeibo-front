export interface GroupBudget {
  big_category_id: number;
  big_category_name: string;
  budget: number;
}

export interface GroupStandardBudgetsList extends Array<GroupBudget> {}

export interface GroupStandardBudgetsListRes {
  standard_budgets: GroupBudget[];
}

export interface GroupBudgetReq {
  big_category_id: number;
  budget: number;
}

export interface GroupBudgetsReq extends Array<GroupBudgetReq> {}
