import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { TodoButton, TextInput } from '../../todo';
import { updateGroupName } from '../../../reducks/groups/operations';
import { Group } from '../../../reducks/groups/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
    },
    paper: {
      width: 400,
      margin: '20px auto auto auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface EditGroupNameProps {
  approvedGroup: Group;
  closeGroupMenu: () => void;
  modalTitleLabel: string;
  modalTextFieldLabel: string;
}

const EditGroupName = (props: EditGroupNameProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  const groupId = props.approvedGroup.group_id;
  const initialGroupName = props.approvedGroup.group_name;

  const isBlankGroupName = groupName === '';

  const openModal = (initialGroupName: string) => {
    setOpen(true);
    setGroupName(initialGroupName);
  };

  const closeModal = () => {
    setOpen(false);
    setGroupName('');
  };

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );

  const onClickSaveButton = () => {
    dispatch(updateGroupName(groupId, groupName));
    closeModal();
    props.closeGroupMenu();
  };

  const body = (
    <div className={classes.paper}>
      <h3 id="simple-modal-title">{props.modalTitleLabel}</h3>
      <p>{props.modalTextFieldLabel}</p>
      <TextInput
        id="filled-basic"
        variant="filled"
        required={true}
        rows={1}
        type={'text'}
        value={groupName}
        onChange={inputGroupName}
      />
      <div className={classes.buttons}>
        <TodoButton
          label={'保存'}
          disabled={isBlankGroupName}
          onClick={() => onClickSaveButton()}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => closeModal()} />
      </div>
    </div>
  );

  return (
    <>
      <MenuItem onClick={() => openModal(initialGroupName)}>グループ名の編集</MenuItem>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export default EditGroupName;
