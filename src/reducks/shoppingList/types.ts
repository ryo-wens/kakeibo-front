export interface RegularShoppingListItem {
  id: number;
  posted_date: Date;
  updated_date: Date;
  expected_purchase_date: string;
  cycle_type: PurchaseCycleType;
  cycle: number | null;
  purchase: string;
  shop: string | null;
  amount: number | null;
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
  transaction_date: string;
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

export interface FetchExpiredShoppingListRes {
  expired_shopping_list: ShoppingList;
}

export interface FetchTodayShoppingListRes {
  regular_shopping_list: RegularShoppingList;
  shopping_list: ShoppingList;
}

export interface FetchTodayShoppingListByCategoriesRes {
  regular_shopping_list: RegularShoppingList;
  shopping_list_by_categories: ShoppingListByCategories;
}

export interface FetchMonthlyShoppingListRes {
  regular_shopping_list: RegularShoppingList;
  shopping_list: ShoppingList;
}

export interface FetchMonthlyShoppingListByCategoriesRes {
  regular_shopping_list: RegularShoppingList;
  shopping_list_by_categories: ShoppingListByCategories;
}

export interface AddShoppingListItemReq {
  expected_purchase_date: Date | null;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
  transaction_auto_add: boolean;
}

export interface AddShoppingListItemRes {
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

export interface EditShoppingListItemReq {
  expected_purchase_date: Date | null;
  complete_flag: boolean;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
  regular_shopping_list_id: number | null;
  transaction_auto_add: boolean;
  related_transaction_data: RelatedTransactionData | null;
}

export interface DeleteShoppingListItemRes {
  message: string;
}

export interface AddRegularShoppingListItemReq {
  expected_purchase_date: Date | null;
  cycle_type: PurchaseCycleType;
  cycle: number | null;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
  transaction_auto_add: boolean;
}

export interface AddRegularShoppingListItemRes {
  regular_shopping_item: RegularShoppingListItem;
  shopping_list: ShoppingList;
}

export interface EditRegularShoppingListItemReq {
  expected_purchase_date: Date | null;
  cycle_type: PurchaseCycleType;
  cycle: number | null;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
  transaction_auto_add: boolean;
}

export interface EditRegularShoppingListItemRes {
  regular_shopping_item: RegularShoppingListItem;
  shopping_list: ShoppingList;
}

export interface DeleteRegularShoppingListItemRes {
  message: string;
}

export type TodayOrMonthly = 'today' | 'monthly';

export type PurchaseCycleType = 'daily' | 'weekly' | 'monthly' | 'custom';

export interface AddRegularShoppingListItemModalInitialState {
  initialExpectedPurchaseDate: Date | null;
  initialCycleType: PurchaseCycleType;
  initialCycle: string | null;
  initialPurchase: string;
  initialAmount: string | null;
  initialBigCategoryId: number;
  initialBigCategoryName: string | null;
  initialBigCategoryIndex: number;
  initialMediumCategoryId: number | null;
  initialCustomCategoryId: number | null;
  initialAssociatedCategory: string;
  initialShop: string | null;
  initialTransactionAutoAdd: boolean;
}
