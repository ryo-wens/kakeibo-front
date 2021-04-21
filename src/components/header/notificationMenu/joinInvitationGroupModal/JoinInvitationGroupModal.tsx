import React from 'react';
import styles from './JoinInvitationGroupModal.module.scss';
import ModalFormLayout from '../../../uikit/form/formLayout/ModalFormLayout';
import Modal from '@material-ui/core/Modal';
import { Group } from '../../../../reducks/groups/types';
import RefuseInvitationGroupFormContainer from '../../../../containers/header/notificationMenu/joinInvitationGroupModal/refuseInvitationGroupForm/RefuseInvitationGroupFormContainer';

interface JoinInvitationGroupModalProps {
  open: boolean;
  openRefuseForm: boolean;
  unapprovedGroup: Group;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleOpenRefuseForm: () => void;
  handleCloseRefuseForm: () => void;
  handleJoinInvitationGroup: () => void;
}

const JoinInvitationGroupModal = (props: JoinInvitationGroupModalProps) => {
  const {
    open,
    openRefuseForm,
    unapprovedGroup: group,
    handleOpenModal,
    handleCloseModal,
    handleOpenRefuseForm,
    handleCloseRefuseForm,
    handleJoinInvitationGroup,
  } = props;

  return (
    <>
      <li className={styles.notificationItem} onClick={handleOpenModal}>
        <span>{group.group_name}</span>から招待されています
      </li>
      <Modal open={open} onClose={handleCloseModal}>
        <div className={styles.modalWrapper}>
          {!openRefuseForm ? (
            <ModalFormLayout titleLabel={'グループに参加'} handleClose={handleCloseModal}>
              <p className={styles.modalMessage}>{group.group_name}に参加しますか？</p>
              <div className={styles.operationBtn}>
                <div>
                  <button
                    className={styles.operationBtn__join}
                    disabled={false}
                    onClick={handleJoinInvitationGroup}
                  >
                    参加
                  </button>
                  <button className={styles.operationBtn__cancel} onClick={handleCloseModal}>
                    キャンセル
                  </button>
                </div>
                <button className={styles.operationBtn__refuse} onClick={handleOpenRefuseForm}>
                  拒否
                </button>
              </div>
            </ModalFormLayout>
          ) : (
            <RefuseInvitationGroupFormContainer
              unapprovedGroup={group}
              handleCloseModal={handleCloseModal}
              handleCloseRefuseForm={handleCloseRefuseForm}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default JoinInvitationGroupModal;
