export interface FetchStandardBudgets {
  big_category_id: number;
  big_category_name: string;
  budget: number;
}
export interface StandardBudgetsList extends Array<FetchStandardBudgets> {}
