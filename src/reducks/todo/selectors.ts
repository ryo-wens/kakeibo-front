import { createSelector } from 'reselect';
import { State } from '../store/types';

const groupSelector = (state: State) => state.groups;

export const getGroupId = createSelector([groupSelector], (state) => state.groupId);
export const getGroupName = createSelector([groupSelector], (state) => state.groupName);
