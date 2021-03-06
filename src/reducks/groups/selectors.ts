import { createSelector } from 'reselect';
import { State } from '../store/types';

const groupSelector = (state: State) => state.groups;

export const getApprovedGroups = createSelector([groupSelector], (state) => state.approvedGroups);
export const getUnapprovedGroups = createSelector(
  [groupSelector],
  (state) => state.unapprovedGroups
);

export const getGroup = createSelector([groupSelector], (state) => state.group);
