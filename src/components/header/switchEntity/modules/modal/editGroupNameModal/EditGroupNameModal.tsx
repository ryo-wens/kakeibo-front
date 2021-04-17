import React from 'react';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './EditGroupNameModal.module.scss';
import GroupNameForm from '../../form/groupNameForm/GroupNameForm';

interface EditGroupNameModalProps {
  open: boolean;
  groupName: string;
  handleOpen: () => void;
  handleClose: () => void;
  handleGroupName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditGroupName: () => void;
  disabledEditButton: boolean;
}

const EditGroupNameModal = (props: EditGroupNameModalProps) => {
  return (
    <>
      <MenuItem onClick={props.handleOpen}>グループ名の編集</MenuItem>
      <Modal open={props.open} onClose={props.handleClose}>
        <div className={styles.modalWrapper}>
          <GroupNameForm
            titleLabel={'グループ名を編集'}
            buttonLabel={'保存'}
            open={props.open}
            groupName={props.groupName}
            handleOpen={props.handleOpen}
            handleClose={props.handleClose}
            handleGroupName={props.handleGroupName}
            handleGroup={props.handleEditGroupName}
            disabledButton={props.disabledEditButton}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditGroupNameModal;
