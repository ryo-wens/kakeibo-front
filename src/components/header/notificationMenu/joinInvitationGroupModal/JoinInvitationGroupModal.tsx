import React from 'react';
import styles from './JoinInvitationGroupModal.module.scss';
import ModalFormLayout from '../../../uikit/form/formLayout/ModalFormLayout';
import Modal from '@material-ui/core/Modal';
import { Group } from '../../../../reducks/groups/types';

interface JoinInvitationGroupModalProps {
  open: boolean;
  unapprovedGroup: Group;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleJoinInvitationGroup: () => void;
}

const JoinInvitationGroupModal = (props: JoinInvitationGroupModalProps) => {
  const {
    open,
    unapprovedGroup: group,
    handleOpenModal,
    handleCloseModal,
    handleJoinInvitationGroup,
  } = props;

  return (
    <>
      <li className={styles.notificationItem} onClick={handleOpenModal}>
        <span>{group.group_name}</span>から招待されています
      </li>
      <Modal open={open} onClose={handleCloseModal}>
        <ModalFormLayout titleLabel={'グループに参加'} handleClose={handleCloseModal}>
          <p className={styles.modalMessage}>
            <span>{group.group_name}</span>に参加しますか？
          </p>
          <div className={styles.operationBtn}>
            <button
              className={styles.operationBtn__add}
              disabled={false}
              onClick={handleJoinInvitationGroup}
            >
              参加する
            </button>
            <button className={styles.operationBtn__cancel} onClick={handleCloseModal}>
              キャンセル
            </button>
          </div>
        </ModalFormLayout>
      </Modal>
    </>
  );
};

export default JoinInvitationGroupModal;
