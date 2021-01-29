import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { useSelector } from 'react-redux';
import { ModalInform } from '../../index';
import { getModalMessage } from '../../../../reducks/modal/selectors';
import { State } from '../../../../reducks/store/types';
import './delete-modal.scss';
import CloseIcon from '@material-ui/icons/Close';

interface DeleteModalProps {
  title: string;
  buttonLabel: string;
  contentName: string;
  disabled: boolean;
  onClickDelete: () => void;
  onClickCloseInputTodoForm?: (event: Event) => void;
}

const DeleteModal = (props: DeleteModalProps) => {
  const selector = useSelector((state: State) => state);
  const modalMessage = getModalMessage(selector);

  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
    if (props.onClickCloseInputTodoForm) {
      document.removeEventListener('click', props.onClickCloseInputTodoForm);
    }
  };

  const closeModal = () => {
    setOpen(false);
    if (props.onClickCloseInputTodoForm) {
      document.addEventListener('click', props.onClickCloseInputTodoForm);
    }
  };

  const body = (
    <div className="delete-modal">
      <div className="delete-modal__position">
        <h3 className="delete-modal__title">{props.title}</h3>
        <button className="delete-modal__close-btn" onClick={() => closeModal()}>
          <CloseIcon />
        </button>
      </div>
      <p className="delete-modal__text">{props.contentName}を削除してもよろしいでしょうか？</p>
      <div className="delete-modal__btn">
        <button
          className="delete-modal__btn--delete"
          disabled={props.disabled}
          onClick={props.onClickDelete}
        >
          {props.buttonLabel}
        </button>
        <button className="delete-modal__btn--cancel" onClick={() => closeModal()}>
          キャンセル
        </button>
      </div>
    </div>
  );

  return (
    <>
      <ModalInform message={modalMessage} />
      <button
        className="delete-modal__btn--delete"
        disabled={props.disabled}
        onClick={() => openModal()}
      >
        {props.buttonLabel}
      </button>
      <Modal open={open} onClose={closeModal}>
        {body}
      </Modal>
    </>
  );
};

export default DeleteModal;
