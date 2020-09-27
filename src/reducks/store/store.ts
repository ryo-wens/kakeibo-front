import { createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import { usersReducer } from '../users/reducers';
import { categoriesReducer } from '../categories/reducers';
import { groupsReducer } from '../groups/reducers';
import { transactionsReducer } from '../transactions/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { History } from 'history';
import { createLogger } from 'redux-logger';
import { modalReducer } from '../modal/reducers';
import { budgetsReducer } from '../budgets/reducers';
import { todoListsReducer } from '../todoLists/reducers';

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;

const composeEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function createStore(history: History) {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  });

  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: usersReducer,
      categories: categoriesReducer,
      groups: groupsReducer,
      todoLists: todoListsReducer,
      transactions: transactionsReducer,
      modal: modalReducer,
      budgets: budgetsReducer,
    }),
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk, logger))
  );
}
