import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose,
  CombinedState,
} from 'redux';
import { usersReducer } from '../users/reducers';
import { categoriesReducer } from '../categories/reducers';
import { groupCategoriesReducer } from '../groupCategories/reducers';
import { groupsReducer } from '../groups/reducers';
import { transactionsReducer } from '../transactions/reducers';
import { groupTransactionsReducer } from '../groupTransactions/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { History } from 'history';
import { createLogger } from 'redux-logger';
import { modalReducer } from '../modal/reducers';
import { budgetsReducer } from '../budgets/reducers';
import { groupBudgetsReducer } from '../groupBudgets/reducers';
import { todoListReducer } from '../todoList/reducers';
import { groupTodoListsReducer } from '../groupTodoList/reducers';
import { groupTasksReducers } from '../groupTasks/reducers';
import { userActions } from '../users/actions';

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare const window: ExtendedWindow;

const composeEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function createStore(history: History) {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  });

  const appReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    categories: categoriesReducer,
    groupCategories: groupCategoriesReducer,
    groups: groupsReducer,
    groupTasks: groupTasksReducers,
    todoList: todoListReducer,
    groupTodoList: groupTodoListsReducer,
    transactions: transactionsReducer,
    groupTransactions: groupTransactionsReducer,
    modal: modalReducer,
    budgets: budgetsReducer,
    groupBudgets: groupBudgetsReducer,
  });

  const rootReducer = (state: CombinedState<any>, action: userActions) => {
    if (action.type === 'LOG_OUT') {
      state = undefined;
    }
    return appReducer(state, action);
  };

  return reduxCreateStore(
    rootReducer,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk, logger))
  );
}
