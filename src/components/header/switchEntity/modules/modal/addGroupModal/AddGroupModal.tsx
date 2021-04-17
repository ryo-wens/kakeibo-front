import React from 'react';
import Modal from '@material-ui/core/Modal';
import { TextInput } from '../../../../../uikit';
import AddIcon from '@material-ui/icons/Add';
import styles from './AddGroupModal.module.scss';
import CloseIcon from '@material-ui/icons/Close';

interface AddGroupProps {
  titleLabel: string;
  open: boolean;
  groupName: string;
  handleOpen: () => void;
  handleClose: () => void;
  handleGroupName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddGroup: () => void;
  isBlankGroupName: boolean;
}

const AddGroupModal = (props: AddGroupProps) => {
  const body = (
    <div className={styles.modalWrapper}>
      <div className={styles.position}>
        <h3>{props.titleLabel}</h3>
        <button onClick={props.handleClose}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.textInput}>
        <TextInput
          id="group-name"
          label={'グループ名'}
          value={props.groupName}
          onChange={props.handleGroupName}
          required={true}
          type={'text'}
          fullWidth={false}
          disabled={false}
        />
      </div>
      <div className={styles.operationBtn}>
        <button
          className={styles.operationBtn__add}
          disabled={props.isBlankGroupName}
          onClick={props.handleAddGroup}
        >
          追加
        </button>
        <button className={styles.operationBtn__cancel} onClick={props.handleClose}>
          キャンセル
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button className={styles.addGroupBtn} onClick={props.handleOpen}>
        <AddIcon />
        グループを追加
      </button>
      <Modal open={props.open} onClose={props.handleClose}>
        {body}
      </Modal>
    </>
  );
};

export default AddGroupModal;
