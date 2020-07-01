import { createSelector } from 'reselect';
import { UserState } from './types';

const usersSelector = (state: UserState) => state;

export const getSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
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
