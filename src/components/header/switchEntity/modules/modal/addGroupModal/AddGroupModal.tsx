import React from 'react';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import styles from './AddGroupModal.module.scss';
import GroupNameForm from '../../form/groupNameForm/GroupNameForm';

interface AddGroupModalProps {
  open: boolean;
  groupName: string;
  handleOpen: () => void;
  handleClose: () => void;
  handleGroupName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddGroup: () => void;
  isBlankGroupName: boolean;
}

const AddGroupModal = (props: AddGroupModalProps) => {
  return (
    <>
      <button className={styles.addGroupBtn} onClick={props.handleOpen}>
        <AddIcon />
        グループを追加
      </button>
      <Modal open={props.open} onClose={props.handleClose}>
        <div className={styles.modalWrapper}>
          <GroupNameForm
            titleLabel={'グループを追加'}
            buttonLabel={'追加'}
            open={props.open}
            groupName={props.groupName}
            handleOpen={props.handleOpen}
            handleClose={props.handleClose}
            handleGroupName={props.handleGroupName}
            handleGroup={props.handleAddGroup}
            disabledButton={props.isBlankGroupName}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddGroupModal;
