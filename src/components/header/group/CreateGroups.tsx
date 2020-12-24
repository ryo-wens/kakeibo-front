import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TodoButton, TextInput } from '../../todo';
import { createGroup } from '../../../reducks/groups/operations';
import { AddButton } from '../../uikit';

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

interface CreateGroupsProps {
  modalTitleLabel: string;
  modalTextFieldLabel: string;
  closeMenu: () => void;
}

const CreateGroups = (props: CreateGroupsProps) => {
  const classes = useStyles();
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
          label={'作成'}
          disabled={isBlankGroupName}
          onClick={() => onClickCreateButton()}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={handleClose} />
      </div>
    </div>
  );

  return (
    <>
      <AddButton label={'グループ作成'} onClick={() => handleOpen()} />
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

export default CreateGroups;