import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import { TodoButton } from '../todo';
import { useDispatch, useSelector } from 'react-redux';
import { ModalInform } from './index';
import { getModalMessage } from '../../reducks/modal/selectors';
import { State } from '../../reducks/store/types';
import { deleteTodoListItem } from '../../reducks/todoLists/operations';
import { groupWithdrawal } from '../../reducks/groups/operations';
import { deleteGroupTodoListItem } from '../../reducks/groupTodoLists/operations';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { push } from 'connected-react-router';

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
  menuLabel: string;
  modalText: string;
  buttonLabel: string;
  todoListItemId?: number;
}

const GenericModal = (props: GenericModalProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const [open, setOpen] = useState<boolean>(false);
  const modalMessage = getModalMessage(selector);
  const templateName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);

  const switchOperation = () => {
    const todoListItemId = props.todoListItemId as number;
    switch (true) {
      case templateName === 'todo' || templateName === 'schedule-todo':
        return dispatch(deleteTodoListItem(todoListItemId));
      case templateName === 'group-todo' && typeof props.todoListItemId === 'number':
        return dispatch(deleteGroupTodoListItem(groupId, todoListItemId));
      case templateName === `group`:
        return dispatch(groupWithdrawal(groupId)) && dispatch(push('/'));
      default:
        return;
    }
  };

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
          onClick={() => switchOperation() && closeModal()}
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
