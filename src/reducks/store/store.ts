import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { usersReducer } from '../users/reducers';
import { categoriesReducer } from '../categories/reducers';
import { groupReducer } from '../todo/reducers';
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
      group: groupReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk, logger)
  );
}
