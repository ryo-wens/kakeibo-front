import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { TextInput } from '../../../uikit';
import { createGroup } from '../../../../reducks/groups/operations';
import AddIcon from '@material-ui/icons/Add';
import './add-group-modal.scss';
import CloseIcon from '@material-ui/icons/Close';

interface CreateGroupsProps {
  modalTitleLabel: string;
  modalTextFieldLabel: string;
  closeMenu: () => void;
}

const AddGroupModal = (props: CreateGroupsProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGroupName('');
  };

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );

  const onClickCreateButton = () => {
    props.closeMenu();
    handleClose();
    dispatch(createGroup(groupName));
  };

  const isBlankGroupName = groupName === '';

  const body = (
    <div className="add-group-modal">
      <div className="add-group-modal__position">
        <h3 id="simple-modal-title">{props.modalTitleLabel}</h3>
        <button onClick={() => handleClose()}>
          <CloseIcon />
        </button>
      </div>
      <TextInput
        id="group-name"
        label={''}
        value={groupName}
        onChange={inputGroupName}
        required={true}
        type={'text'}
        fullWidth={false}
        disabled={false}
      />
      <div className="add-group-modal__btn">
        <button
          className="add-group-modal__btn--add"
          disabled={isBlankGroupName}
          onClick={() => onClickCreateButton()}
        >
          追加
        </button>
        <button className="add-group-modal__btn--cancel" onClick={handleClose}>
          キャンセル
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button className="add-group-modal__add-btn" onClick={() => handleOpen()}>
        <AddIcon />
        グループを追加
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default AddGroupModal;
