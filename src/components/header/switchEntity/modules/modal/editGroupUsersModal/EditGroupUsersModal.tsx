import React from 'react';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { Group } from '../../../../../../reducks/groups/types';
import styles from './EditGroupUsersModal.module.scss';
import ModalFormLayout from '../../../../../uikit/form/formLayout/ModalFormLayout';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InviteUserFormContainer from '../../../../../../containers/header/switchEntity/modules/form/InviteUserFormContainer';

interface EditGroupUsersModalProps {
  open: boolean;
  openInviteForm: boolean;
  approvedGroup: Group;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleOpenInviteForm: () => void;
  handleCloseInviteForm: () => void;
}

const EditGroupUsersModal = (props: EditGroupUsersModalProps) => {
  const existInviteUsers = props.approvedGroup.unapproved_users_list.length > 0;

  return (
    <>
      <MenuItem onClick={props.handleOpenModal}>グループユーザーの編集</MenuItem>
      <Modal open={props.open} onClose={props.handleCloseModal}>
        <div className={styles.modalWrapper}>
          {!props.openInviteForm && (
            <ModalFormLayout
              titleLabel={'グループユーザーの編集'}
              handleClose={props.handleCloseModal}
            >
              <ul className={styles.userList}>
                {props.approvedGroup.approved_users_list.map((approvedUser) => {
                  return <li key={approvedUser.user_id}>{approvedUser.user_name}</li>;
                })}
              </ul>
              {existInviteUsers && (
                <div className={styles.invitationUserListArea}>
                  <p className={styles.invitationUserListText}>招待中のユーザー</p>
                  <ul className={styles.invitationUserList}>
                    {props.approvedGroup.unapproved_users_list.map((unapprovedUser) => {
                      return <li key={unapprovedUser.user_id}>{unapprovedUser.user_name}</li>;
                    })}
                  </ul>
                </div>
              )}
              <button className={styles.inviteBtn} onClick={props.handleOpenInviteForm}>
                <span>ユーザーを招待</span>
                <ChevronRightIcon />
              </button>
            </ModalFormLayout>
          )}
          {props.openInviteForm && (
            <InviteUserFormContainer
              approvedGroup={props.approvedGroup}
              handleCloseModal={props.handleCloseModal}
              handleCloseInviteForm={props.handleCloseInviteForm}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
export default EditGroupUsersModal;
