export interface Category {
  categoryType: string;
  transactionType: string;
  id: number;
  name: string;
  associatedCategoriesList: AssociatedCategories;
}

export interface AssociatedCategory {
  categoryType: string;
  id: number;
  name: string;
  bigCategoryId: number;
}
export interface AssociatedCategories extends Array<AssociatedCategory> {}
export interface Categories extends Array<Category> {}
