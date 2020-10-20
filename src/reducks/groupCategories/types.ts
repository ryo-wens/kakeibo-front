export interface GroupCategory {
  category_type: string;
  transaction_type: string;
  id: number;
  name: string;
  associated_categories_list: GroupAssociatedCategories;
}

export interface GroupAssociatedCategory {
  category_type: string;
  id: number;
  name: string;
  big_category_id: number;
}

export interface GroupCategories extends Array<GroupCategory> {}
export interface GroupAssociatedCategories extends Array<GroupAssociatedCategory> {}

export interface fetchGroupCategoriesRes {
  income_categories_list: [];
  expense_categories_list: [];
}
