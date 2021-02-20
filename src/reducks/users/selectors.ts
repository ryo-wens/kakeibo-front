import { createSelector } from 'reselect';
import { State } from '../store/types';

const usersSelector = (state: State) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.user_id);
export const getErrorMessage = createSelector([usersSelector], (state) => state.errorMessage);
export const getConflictMessage = createSelector([usersSelector], (state) => state.conflictMessage);
