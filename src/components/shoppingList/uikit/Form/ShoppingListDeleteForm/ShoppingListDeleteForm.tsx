import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import './shopping-list-delete-form.scss';

interface ShoppingListDeleteFormProps {
  titleLabel: string;
  purchase: string;
  closeModal: () => void;
  closeDeleteForm: () => void;
}

const ShoppingListDeleteForm = (props: ShoppingListDeleteFormProps) => {
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
      <button className="shopping-list-delete-form__delete-btn">削除</button>
    </div>
  );
};

export default ShoppingListDeleteForm;
