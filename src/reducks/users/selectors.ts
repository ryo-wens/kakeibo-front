import { createSelector } from 'reselect';
import { State } from '../store/types';

const usersSelector = (state: State) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.id);
export const getUserName = createSelector([usersSelector], (state) => state.name);
export const getEmail = createSelector([usersSelector], (state) => state.email);
