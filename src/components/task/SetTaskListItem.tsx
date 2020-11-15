import React, { useCallback, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/task/set-task-list-item.scss';
import { DeleteButton, SaveButton } from '../uikit';

const SetTaskListItem = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const selectContents = [
    {
      key: 'タスク名',
      value: 'value',
    },
    {
      key: '基準日',
      value: 'value',
    },
    {
      key: 'サイクルタイプ',
      value: 'value',
    },
    {
      key: 'サイクル',
      value: 'value',
    },
  ];

  const body = (
    <div className="set-task-list-item">
      <div className="set-task-list-item__position">
        <h3 className="set-task-list-item__title">タスクの割り当て</h3>
        <button className="set-task-list-item__btn-position" onClick={() => closeModal()}>
          <CloseIcon />
        </button>
      </div>
      <div className="set-task-list-item__select-contents-test">
        {selectContents.map((selectContent) => {
          return (
            <div className="set-task-list-item__select-contents" key={selectContent.key}>
              <span className="set-task-list-item__select-contents--key">{selectContent.key}</span>
              <span className="set-task-list-item__select-contents--value">
                {selectContent.value}
              </span>
            </div>
          );
        })}
      </div>
      <div className="set-task-list-item__operation-btn">
        <SaveButton
          label={'追加'}
          disabled={false}
          onClick={() => {
            console.log('テスト');
          }}
        />
        <DeleteButton
          label={'削除'}
          disabled={false}
          onClick={() => {
            console.log('テスト');
          }}
        />
      </div>
    </div>
  );

  return (
    <div>
      <button className="task--btn" disabled={false} onClick={() => openModal()}>
        タスク割り当て
      </button>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SetTaskListItem;
