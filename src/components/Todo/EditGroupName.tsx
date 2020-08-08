import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TodoButton, TextInput } from './index';
import { createGroup } from '../../reducks/groups/operations';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface EditGroupNameProps {
  label: string;
  label2: string;
}

const EditGroupName = (props: EditGroupNameProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
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
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title">{props.label}</h3>
      <p>{props.label2}</p>
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
    <div>
      <button type="button" onClick={handleOpen}>
        {props.label}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default EditGroupName;
