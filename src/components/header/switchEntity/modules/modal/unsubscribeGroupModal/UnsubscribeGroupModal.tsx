import React from 'react';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { ModalInform } from '../../../../../uikit';
import ModalFormLayout from '../../../../../uikit/form/formLayout/ModalFormLayout';
import styles from './UnsubscribeGroupModal.module.scss';
import { Group } from '../../../../../../reducks/groups/types';

interface UnsubscribeGroupModalProps {
  open: boolean;
  approvedGroup: Group;
  modalMessage: string;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleUnsubscribeGroup: () => void;
}

const UnsubscribeGroupModal = (props: UnsubscribeGroupModalProps) => {
  const {
    open,
    approvedGroup,
    modalMessage,
    handleOpenModal,
    handleCloseModal,
    handleUnsubscribeGroup,
  } = props;

  return (
    <>
      <MenuItem onClick={handleOpenModal}>グループを退会</MenuItem>
      <ModalInform message={modalMessage} />
      <Modal open={open} onClose={handleCloseModal}>
        <div className={styles.modalWrapper}>
          <ModalFormLayout titleLabel={'グループを退会'} handleClose={handleCloseModal}>
            <p className={styles.message}>{approvedGroup.group_name}を退会しますか？</p>
            <div className={styles.operationBtn}>
              <button className={styles.operationBtn__unsubscribe} onClick={handleUnsubscribeGroup}>
                退会
              </button>
              <button className={styles.operationBtn__cancel} onClick={handleCloseModal}>
                キャンセル
              </button>
            </div>
          </ModalFormLayout>
        </div>
      </Modal>
    </>
  );
};

export default UnsubscribeGroupModal;
