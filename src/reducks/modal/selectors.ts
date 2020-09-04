import { createSelector } from 'reselect';
import { State } from '../store/types';

const modalSelector = (state: State) => state.modal;

export const getModalMessage = createSelector([modalSelector], (state) => state.message);
export const getModalOpen = createSelector([modalSelector], (state) => state.open);
