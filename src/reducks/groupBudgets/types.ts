export interface GroupBudget {
  big_category_id: number;
  big_category_name: string;
  budget: number;
}

export interface GroupStandardBudgetsList extends Array<GroupBudget> {}
