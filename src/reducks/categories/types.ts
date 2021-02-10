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

export interface CategoriesError {
  statusCode: number;
  errorMessage: string;
}

export interface FetchCategoriesRes {
  income_categories_list: [];
  expense_categories_list: [];
}

export interface CrudCustomCategoryReq {
  name: string;
  big_category_id: number;
}

export interface CrudCustomCategoryRes {
  category_type: string;
  id: number;
  name: string;
  big_category_id: number;
}

export interface DeletedMessage {
  message: string;
}

export interface CategoryName {
  mediumCategory: string | null;
  customCategory: string | null;
}

export interface CategoryId {
  bigCategoryId: number;
  mediumCategoryId: number | null;
  customCategoryId: number | null;
}
