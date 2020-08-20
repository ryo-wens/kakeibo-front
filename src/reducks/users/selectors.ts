import { createSelector } from 'reselect';
import { State } from '../store/types';

const usersSelector = (state: State) => state.users;

export const getLoggedIn = createSelector(
  [usersSelector],
  (state) => state.isLoggedIn
);
export const getUserId = createSelector(
  [usersSelector],
  (state) => state.userId
);
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.userName
);
export const getPassword = createSelector(
  [usersSelector],
  (state) => state.password
);
export const getEmail = createSelector([usersSelector], (state) => state.email);
