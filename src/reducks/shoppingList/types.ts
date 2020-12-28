export interface RegularShoppingListItem {
  id: number;
  posted_date: Date;
  updated_date: Date;
  expected_purchase_date: string;
  cycle_type: 'daily' | 'weekly' | 'monthly' | 'custom';
  cycle: number | null;
  purchase: string;
  shop: string | null;
  amount: number;
  big_category_id: number;
  big_category_name: string;
  medium_category_id: number | null;
  medium_category_name: string | null;
  custom_category_id: number | null;
  custom_category_name: string | null;
  transaction_auto_add: boolean;
}

export interface RegularShoppingList extends Array<RegularShoppingListItem> {}

export interface ShoppingListItem {
  id: number;
  posted_date: Date;
  updated_date: Date;
  expected_purchase_date: string;
  complete_flag: boolean;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  big_category_name: string;
  medium_category_id: number | null;
  medium_category_name: string | null;
  custom_category_id: number | null;
  custom_category_name: string | null;
  regular_shopping_list_id: number | null;
  transaction_auto_add: boolean;
  related_transaction_data: RelatedTransactionData | null;
}

export interface RelatedTransactionData {
  id: number;
  transaction_type: string;
  posted_date: Date;
  updated_date: Date;
  transaction_date: Date;
  shop: string | null;
  memo: string | null;
  amount: number;
  big_category_id: number;
  big_category_name: string;
  medium_category_id: number | null;
  medium_category_name: string | null;
  custom_category_id: number | null;
  custom_category_name: string | null;
}

export interface ShoppingList extends Array<ShoppingListItem> {}

export interface ShoppingListItemByCategories {
  big_category_name: string;
  shopping_list: ShoppingList;
}

export interface ShoppingListByCategories extends Array<ShoppingListItemByCategories> {}

export interface FetchTodayShoppingListRes {
  regular_shopping_list: RegularShoppingList;
  shopping_list: ShoppingList;
}

export interface FetchMonthlyShoppingListRes {
  regular_shopping_list: RegularShoppingList;
  shopping_list: ShoppingList;
}
