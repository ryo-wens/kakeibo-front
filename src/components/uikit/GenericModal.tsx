import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import { ModalInform } from './index';
import { getModalMessage } from '../../reducks/modal/selectors';
import { State } from '../../reducks/store/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  buttonLabel: string;
  menuLabel: string;
  modalText: string;
  onClickGroupWithdrawal: () => void;
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

  const switchOperation = () => {
    return props.onClickGroupWithdrawal();
  };

  const body = (
    <div className={classes.paper}>
      <p>{props.modalText}</p>
      <div className="add-group-modal__btn">
        <button className="add-group-modal__btn--add" onClick={() => switchOperation()}>
          {props.buttonLabel}
        </button>
        <button className="add-group-modal__btn--cancel" onClick={() => closeModal()}>
          キャンセル
        </button>
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
