import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { TodoButton, TextInput } from './index';
import { updateGroupName } from '../../reducks/groups/operations';
import { Group } from '../../reducks/groups/types';

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
  modalTitleLabel: string;
  modalTextFieldLabel: string;
}

const EditGroupName = (props: EditGroupNameProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState<string>('');

  const groupId = props.approvedGroup.group_id;

  const initialGroupName = props.approvedGroup.group_name;

  const handleOpen = (initialGroupName: string) => {
    setOpen(true);
    setGroupName(initialGroupName);
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
          onClick={() => dispatch(updateGroupName(groupId, groupName)) && handleClose()}
        />
        <TodoButton label={'キャンセル'} onClick={() => handleClose()} />
      </div>
    </div>
  );

  return (
    <>
      <MenuItem onClick={() => handleOpen(initialGroupName)}>グループ名の編集</MenuItem>
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

export default EditGroupName;
