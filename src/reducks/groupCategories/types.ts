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

export type GroupCategories = Array<GroupCategory>;
export type GroupAssociatedCategories = Array<GroupAssociatedCategory>;
