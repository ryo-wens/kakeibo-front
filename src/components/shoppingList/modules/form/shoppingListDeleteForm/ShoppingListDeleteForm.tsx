import React from 'react';
import styles from './ShoppingListDeleteForm.module.scss';
import ModalFormLayout from '../../../../uikit/form/formLayout/ModalFormLayout';

interface ShoppingListDeleteFormProps {
  titleLabel: string;
  purchase: string;
  handleCloseModal: () => void;
  handleCloseDeleteForm: () => void;
  handleDeleteShoppingListItem: () => void;
}

const ShoppingListDeleteForm = (props: ShoppingListDeleteFormProps) => {
  const {
    titleLabel,
    purchase,
    handleCloseModal,
    handleCloseDeleteForm,
    handleDeleteShoppingListItem,
  } = props;

  return (
    <ModalFormLayout
      titleLabel={titleLabel}
      handleClose={handleCloseModal}
      handleBack={handleCloseDeleteForm}
    >
      <p className={styles.message}>{purchase}を削除しますか？</p>
      <div className={styles.operationBtn}>
        <button className={styles.operationBtn__delete} onClick={handleDeleteShoppingListItem}>
          削除
        </button>
        <button className={styles.operationBtn__cancel} onClick={handleCloseDeleteForm}>
          キャンセル
        </button>
      </div>
    </ModalFormLayout>
  );
};

export default ShoppingListDeleteForm;
