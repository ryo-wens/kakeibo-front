import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import './shopping-list-delete-form.scss';
import { Action, Dispatch } from 'redux';
import { State } from '../../../../../reducks/store/types';
import { useDispatch } from 'react-redux';

interface ShoppingListDeleteFormProps {
  titleLabel: string;
  purchase: string;
  closeModal: () => void;
  closeDeleteForm: () => void;
  dispatchOperation: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
}

const ShoppingListDeleteForm = (props: ShoppingListDeleteFormProps) => {
  const dispatch = useDispatch();

  return (
    <div className="shopping-list-delete-form">
      <div className="shopping-list-delete-form__position">
        <button
          className="shopping-list-delete-form__back-btn"
          onClick={() => props.closeDeleteForm()}
        >
          <ChevronLeftIcon />
        </button>
        <h3 className="shopping-list-delete-form__title">{props.titleLabel}</h3>
        <button className="shopping-list-delete-form__close-btn" onClick={() => props.closeModal()}>
          <CloseIcon />
        </button>
      </div>
      <p className="shopping-list-delete-form__message">{props.purchase}を削除しますか？</p>
      <button
        className="shopping-list-delete-form__delete-btn"
        onClick={() => {
          dispatch(props.dispatchOperation);
          props.closeModal();
        }}
      >
        削除
      </button>
    </div>
  );
};

export default ShoppingListDeleteForm;
