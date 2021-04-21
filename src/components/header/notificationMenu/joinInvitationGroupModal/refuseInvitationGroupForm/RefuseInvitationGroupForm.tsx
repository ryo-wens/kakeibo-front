import React from 'react';
import styles from './RefuseInvitationGroupForm.module.scss';
import ModalFormLayout from '../../../../uikit/form/formLayout/ModalFormLayout';

interface RefuseInvitationGroupFormProps {
  groupName: string;
  handleCloseModal: () => void;
  handleCloseRefuseForm: () => void;
  handleRefuseInvitationGroup: () => void;
}

const RefuseInvitationGroupForm = (props: RefuseInvitationGroupFormProps) => {
  const { groupName, handleCloseModal, handleCloseRefuseForm, handleRefuseInvitationGroup } = props;

  return (
    <ModalFormLayout
      titleLabel={'グループ招待を拒否'}
      handleClose={handleCloseModal}
      handleBack={handleCloseRefuseForm}
    >
      <p className={styles.message}>{groupName}からの招待を拒否しますか？</p>
      <div className={styles.operationBtn}>
        <button className={styles.operationBtn__delete} onClick={handleRefuseInvitationGroup}>
          拒否
        </button>
        <button className={styles.operationBtn__cancel} onClick={handleCloseRefuseForm}>
          キャンセル
        </button>
      </div>
    </ModalFormLayout>
  );
};

export default RefuseInvitationGroupForm;
