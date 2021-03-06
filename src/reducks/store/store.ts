import { createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import { usersReducer } from '../users/reducers';
import { categoriesReducer } from '../categories/reducers';
import { groupCategoriesReducer } from '../groupCategories/reducers';
import { groupsReducer } from '../groups/reducers';
import { transactionsReducer } from '../transactions/reducers';
import { groupTransactionsReducer } from '../groupTransactions/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { History } from 'history';
import logger from 'redux-logger';
import { modalReducer } from '../modal/reducers';
import { budgetsReducer } from '../budgets/reducers';
import { groupBudgetsReducer } from '../groupBudgets/reducers';
import { todoListReducer } from '../todoList/reducers';
import { groupTodoListsReducer } from '../groupTodoList/reducers';
import { groupTasksReducers } from '../groupTasks/reducers';
import { userActions } from '../users/actions';
import { shoppingListReducers } from '../shoppingList/reducers';
import { groupShoppingListReducers } from '../groupShoppingList/reducers';

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare const window: ExtendedWindow;

const composeEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function createStore(history: History) {
  const appReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    groups: groupsReducer,
    categories: categoriesReducer,
    groupCategories: groupCategoriesReducer,
    transactions: transactionsReducer,
    groupTransactions: groupTransactionsReducer,
    budgets: budgetsReducer,
    groupBudgets: groupBudgetsReducer,
    groupTasks: groupTasksReducers,
    shoppingList: shoppingListReducers,
    groupShoppingList: groupShoppingListReducers,
    todoList: todoListReducer,
    groupTodoList: groupTodoListsReducer,
    modal: modalReducer,
  });

  const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: userActions) => {
    if (action.type === 'LOG_OUT') {
      state = undefined;
    }
    return appReducer(state, action);
  };

  return process.env.NODE_ENV !== 'production'
    ? reduxCreateStore(
        rootReducer,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk, logger))
      )
    : reduxCreateStore(rootReducer, applyMiddleware(routerMiddleware(history), thunk));
}
