export interface Category {
  category_type: string;
  transaction_type: string;
  id: number;
  name: string;
  associated_categories_list: AssociatedCategories;
}

export interface AssociatedCategory {
  category_type: string;
  id: number;
  name: string;
  big_category_id: number;
}
export interface AssociatedCategories extends Array<AssociatedCategory> {}
export interface Categories extends Array<Category> {}
