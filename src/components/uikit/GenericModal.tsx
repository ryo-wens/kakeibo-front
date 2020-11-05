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
import { deleteGroupTodoListItem } from '../../reducks/groupTodoList/operations';
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
  buttonLabel: string;
  menuLabel: string;
  modalText: string;
  closeMenu?: () => void;
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

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onClickGroupWithdrawal = () => {
    const closeMenu = props.closeMenu as () => void;
    closeMenu();
    dispatch(groupWithdrawal(groupId));
    dispatch(push('/'));
  };

  const switchOperation = () => {
    const todoListItemId = props.todoListItemId as number;
    switch (true) {
      case templateName === 'todo':
        return dispatch(deleteTodoListItem(todoListItemId)) && closeModal();
      case templateName === 'group' && typeof props.todoListItemId === 'number':
        return dispatch(deleteGroupTodoListItem(groupId, todoListItemId)) && closeModal();
      case templateName === `group`:
        return onClickGroupWithdrawal();
      default:
        return;
    }
  };

  const body = (
    <div className={classes.paper}>
      <p>{props.modalText}</p>
      <div className={classes.buttons}>
        <TodoButton label={props.buttonLabel} disabled={false} onClick={() => switchOperation()} />
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
