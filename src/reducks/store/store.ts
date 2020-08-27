import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { usersReducer } from '../users/reducers';
import { categoriesReducer } from '../categories/reducers';
import { groupsReducer } from '../groups/reducers';
import { transactionsReducer } from '../transactions/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { History } from 'history';
import { createLogger } from 'redux-logger';

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
      transactions: transactionsReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk, logger)
  );
}
