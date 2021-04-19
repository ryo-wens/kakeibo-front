import React from 'react';
import styles from './InviteUserForm.module.scss';
import ModalFormLayout from '../../../../../uikit/form/formLayout/ModalFormLayout';
import { TextInput } from '../../../../../uikit';

interface InviteUserFormProps {
  userId: string;
  handleCloseModal: () => void;
  handleCloseInviteForm: () => void;
  handleUserId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInviteUsersToGroup: () => void;
  isBlankUserId: boolean;
}

const InviteUserForm = (props: InviteUserFormProps) => {
  const {
    userId,
    handleCloseModal,
    handleCloseInviteForm,
    handleUserId,
    handleInviteUsersToGroup,
    isBlankUserId,
  } = props;

  return (
    <ModalFormLayout
      titleLabel={'ユーザーを招待'}
      handleClose={handleCloseModal}
      handleBack={handleCloseInviteForm}
    >
      <div className={styles.textInput}>
        <TextInput
          id="invite-user-name"
          label={'ユーザーを検索'}
          value={userId}
          onChange={handleUserId}
          required={false}
          type={'text'}
          fullWidth={false}
          disabled={false}
        />
      </div>
      <div className={styles.operationBtn}>
        <button
          className={styles.operationBtn__invite}
          disabled={isBlankUserId}
          onClick={handleInviteUsersToGroup}
        >
          招待を送る
        </button>
        <button className={styles.operationBtn__cancel} onClick={handleCloseInviteForm}>
          キャンセル
        </button>
      </div>
    </ModalFormLayout>
  );
};
export default InviteUserForm;
