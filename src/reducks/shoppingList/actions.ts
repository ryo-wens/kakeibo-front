import { RegularShoppingList, ShoppingList } from './types';
export type ShoppingListActions = ReturnType<typeof fetchTodayShoppingListAction>;

export const FETCH_TODAY_SHOPPING_LIST = 'FETCH_TODAY_SHOPPING_LIST';
export const fetchTodayShoppingListAction = (
  regularShoppingList: RegularShoppingList,
  todayShoppingList: ShoppingList
) => {
  return {
    type: FETCH_TODAY_SHOPPING_LIST,
    payload: {
      regularShoppingList: regularShoppingList,
      todayShoppingList: todayShoppingList,
    },
  };
};
