import * as Actions from './actions';
import { modalAction } from './actions';
import initialState from '../store/initialState';

export const modalReducers = (state = initialState.modal, action: modalAction) => {
  switch (action.type) {
    case Actions.OPEN_TEXT_MODAL:
      return {
        ...state,
        ...action.payload,
      };
  }
};
