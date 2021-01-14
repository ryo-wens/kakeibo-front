import { RegularShoppingList, ShoppingList, ShoppingListByCategories } from '../shoppingList/types';

export interface FetchGroupExpiredShoppingListRes {
  expired_shopping_list: ShoppingList;
}

export interface FetchGroupTodayShoppingListRes {
  regular_shopping_list: RegularShoppingList;
  shopping_list: ShoppingList;
}

export interface FetchGroupTodayShoppingListByCategoriesRes {
  regular_shopping_list: RegularShoppingList;
  shopping_list_by_categories: ShoppingListByCategories;
}
