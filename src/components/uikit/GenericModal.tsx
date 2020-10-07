import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { TodoButton } from '../todo';
import { useSelector } from 'react-redux';
import { ModalInform } from './index';
import { getModalMessage } from '../../reducks/modal/selectors';
import { State } from '../../reducks/store/types';
import { Dispatch, Action } from 'redux';

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

interface GenericModalProps {
  dispatch: () => (dispatch: Dispatch<Action>, getState: () => State) => void;
  menuLabel: string;
  modalText: string;
  buttonLabel: string;
}

const GenericModal = (props: GenericModalProps) => {
  const classes = useStyles();
  const selector = useSelector((state: State) => state);
  const [open, setOpen] = useState<boolean>(false);
  const modalMessage = getModalMessage(selector);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <p>{props.modalText}</p>
      <div className={classes.buttons}>
        <TodoButton
          label={props.buttonLabel}
          disabled={false}
          onClick={closeModal && props.dispatch}
        />
        <TodoButton label={'キャンセル'} disabled={false} onClick={() => closeModal()} />
      </div>
    </div>
  );

  return (
    <>
      <MenuItem onClick={() => openModal()}>{props.menuLabel}</MenuItem>
      <ModalInform message={modalMessage} />
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

export default GenericModal;
