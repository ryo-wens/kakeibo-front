import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { usersReducer } from '../users/reducers';
import { categoriesReducer } from '../categories/reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { History } from 'history';

export default function createStore(history: History) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: usersReducer,
      categories: categoriesReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
