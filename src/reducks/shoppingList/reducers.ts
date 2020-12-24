import { ShoppingListActions } from './actions';
import * as Actions from './actions';
import initialState from '../store/initialState';

export const shoppingListReducers = (
  state = initialState.shoppingList,
  action: ShoppingListActions
) => {
  switch (action.type) {
    case Actions.FETCH_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
