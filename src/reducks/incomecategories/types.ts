export interface IncomeCategoriesState {
  categoryType: string;
  transactionType: string;
  id: number;
  name: string;
  associatedCategoriesList: [
    {
      categoryType: string;
      id: number;
      name: string;
      bigCategoryId: number;
    }
  ];
}
