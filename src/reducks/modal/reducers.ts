import * as Actions from './actions';
import { modalAction } from './actions';
import initialState from '../store/initialState';

export const modalReducers = (state = initialState.modal, action: modalAction) => {
  switch (action.type) {
    case Actions.INVITE_GROUP_REJECT_MODAL:
      return {
        ...state,
        ...action.payload,
      };
  }
};
