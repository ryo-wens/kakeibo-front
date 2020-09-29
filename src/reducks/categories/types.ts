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

export type AssociatedCategories = Array<AssociatedCategory>;
export type Categories = Array<Category>;

export interface fetchCategoriesRes {
  income_categories_list: [];
  expense_categories_list: [];
}

export interface addCustomReq {
  name: string;
  big_category_id: number;
}

export interface addCustomRes {
  category_type: string;
  id: number;
  name: string;
  big_category_id: number;
}

export interface editCustomReq {
  name: string;
  big_category_id: number;
}

export interface editCustomRes {
  category_type: string;
  id: number;
  name: string;
  big_category_id: number;
}

export interface deleteCustomRes {
  message: string;
}
