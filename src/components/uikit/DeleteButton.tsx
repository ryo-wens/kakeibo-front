import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ModalInform } from './index';
import { getModalMessage } from '../../reducks/modal/selectors';
import { State } from '../../reducks/store/types';
import '../../assets/modules/delete-btn.scss';
import { Action, Dispatch } from 'redux';

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

interface DeleteButtonProps {
  buttonLabel: string;
  modalTitle: string;
  contentName: string;
  disabled: boolean;
  onClickDelete: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
  onClickCloseInputTodoList: (event: Event) => void;
}

const DeleteButton = (props: DeleteButtonProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const [open, setOpen] = useState<boolean>(false);
  const modalMessage = getModalMessage(selector);

  const openModal = () => {
    setOpen(true);
    document.removeEventListener('click', props.onClickCloseInputTodoList);
  };

  const closeModal = () => {
    setOpen(false);
    document.addEventListener('click', props.onClickCloseInputTodoList);
  };

  const body = (
    <div className={classes.paper}>
      <h3 className="delete-btn__modal-title">
        選択した{props.modalTitle}を{props.buttonLabel}
      </h3>
      <p className="delete-btn__modal-text">
        {props.contentName}を{props.buttonLabel}してもよろしいでしょうか？
      </p>
      <div className="delete-btn__modal-btn">
        <button
          className="delete-btn"
          disabled={props.disabled}
          onClick={() => {
            dispatch(props.onClickDelete);
            closeModal();
          }}
        >
          {props.buttonLabel}
        </button>
        <button
          className="delete-btn__modal-btn--cancel"
          disabled={false}
          onClick={() => closeModal()}
        >
          キャンセル
        </button>
      </div>
    </div>
  );

  return (
    <>
      <ModalInform message={modalMessage} />
      <button className="delete-btn" disabled={props.disabled} onClick={() => openModal()}>
        {props.buttonLabel}
      </button>
      <Modal open={open} onClose={closeModal}>
        {body}
      </Modal>
    </>
  );
};

export default DeleteButton;
