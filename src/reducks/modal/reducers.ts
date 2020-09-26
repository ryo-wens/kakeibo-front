import * as Actions from './actions';
import { modalActions } from './actions';
import initialState from '../store/initialState';

export const modalReducer = (state = initialState.modal, action: modalActions) => {
  switch (action.type) {
    case Actions.OPEN_TEXT_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CLOSE_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
