import { PurchaseCycleType, RegularShoppingListItem, ShoppingList } from '../shoppingList/types';

export interface GroupRegularShoppingListItem {
  id: number;
  posted_date: Date;
  updated_date: Date;
  expected_purchase_date: string;
  cycle_type: 'daily' | 'weekly' | 'monthly' | 'custom';
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
  payment_user_id: string | null;
  transaction_auto_add: boolean;
}

export interface GroupRegularShoppingList extends Array<GroupRegularShoppingListItem> {}

export interface GroupShoppingListItem {
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
  payment_user_id: string | null;
  transaction_auto_add: boolean;
  related_transaction_data: GroupRelatedTransactionData | null;
}

export interface GroupRelatedTransactionData {
  id: number;
  transaction_type: string;
  posted_date: Date;
  updated_date: Date;
  transaction_date: string;
  shop: string | null;
  memo: string | null;
  amount: number;
  posted_user_id: string;
  updated_user_id: string | null;
  payment_user_id: string;
  big_category_id: number;
  big_category_name: string;
  medium_category_id: number | null;
  medium_category_name: string | null;
  custom_category_id: number | null;
  custom_category_name: string | null;
}

export interface GroupShoppingList extends Array<GroupShoppingListItem> {}

export interface GroupShoppingListItemByCategories {
  big_category_name: string;
  shopping_list: GroupShoppingList;
}

export interface GroupShoppingListByCategories extends Array<GroupShoppingListItemByCategories> {}

export interface FetchGroupExpiredShoppingListRes {
  expired_shopping_list: GroupShoppingList;
}

export interface FetchGroupTodayShoppingListRes {
  regular_shopping_list: GroupRegularShoppingList;
  shopping_list: GroupShoppingList;
}

export interface FetchGroupTodayShoppingListByCategoriesRes {
  regular_shopping_list: GroupRegularShoppingList;
  shopping_list_by_categories: GroupShoppingListByCategories;
}

export interface FetchGroupMonthlyShoppingListRes {
  regular_shopping_list: GroupRegularShoppingList;
  shopping_list: GroupShoppingList;
}

export interface FetchGroupMonthlyShoppingListByCategoriesRes {
  regular_shopping_list: GroupRegularShoppingList;
  shopping_list_by_categories: GroupShoppingListByCategories;
}

export interface AddGroupShoppingListItemReq {
  expected_purchase_date: Date;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
  payment_user_id: string | null;
  transaction_auto_add: boolean;
}

export interface EditGroupShoppingListItemReq {
  expected_purchase_date: Date;
  complete_flag: boolean;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
  regular_shopping_list_id: number | null;
  payment_user_id: string | null;
  transaction_auto_add: boolean;
  related_transaction_data: GroupRelatedTransactionData | null;
}

export interface DeleteGroupShoppingListItemRes {
  message: string;
}

export interface AddGroupRegularShoppingListItemReq {
  expected_purchase_date: Date;
  cycle_type: 'daily' | 'weekly' | 'monthly' | 'custom';
  cycle: number | null;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
  payment_user_id: string | null;
  transaction_auto_add: boolean;
}

export interface AddGroupRegularShoppingListItemRes {
  regular_shopping_item: GroupRegularShoppingListItem;
  shopping_list: GroupShoppingList;
}

export interface EditGroupRegularShoppingListItemReq {
  expected_purchase_date: Date;
  cycle_type: 'daily' | 'weekly' | 'monthly' | 'custom';
  cycle: number | null;
  purchase: string;
  shop: string | null;
  amount: number | null;
  big_category_id: number;
  medium_category_id: number | null;
  custom_category_id: number | null;
  payment_user_id: string | null;
  transaction_auto_add: boolean;
}

export interface EditGroupRegularShoppingListItemRes {
  regular_shopping_item: RegularShoppingListItem;
  shopping_list: ShoppingList;
}

export interface DeleteGroupRegularShoppingListItemRes {
  message: string;
}

export interface AddGroupRegularShoppingListItemModalInitialState {
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
  initialPaymentUser: string | null;
  initialTransactionAutoAdd: boolean;
}
