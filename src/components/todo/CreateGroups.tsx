import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TodoButton, TextInput } from './index';
import { createGroup } from '../../reducks/groups/operations';
import { AddButton } from './index';

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

interface TodoModalProps {
  createGroup: string;
  groupName: string;
}

const CreateGroups = (props: TodoModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputGroupName = useCallback(
    (event) => {
      setGroupName(event.target.value);
    },
    [setGroupName]
  );

  const body = (
    <div className={classes.paper}>
      <h3 id="simple-modal-title">{props.createGroup}</h3>
      <p>{props.groupName}</p>
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
        <TodoButton label={'作成'} onClick={() => dispatch(createGroup(groupName))} />
        <TodoButton label={'キャンセル'} onClick={() => console.log('クリック')} />
      </div>
    </div>
  );

  return (
    <>
      <div onClick={handleOpen}>
        <AddButton label={'グループ作成'} />
      </div>
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