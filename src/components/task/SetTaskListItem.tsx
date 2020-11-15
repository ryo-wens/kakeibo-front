import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/task/set-task-list-item.scss';
import { DeleteButton, SaveButton } from '../uikit';

interface SetTaskListItemProps {
  closeModal: () => void;
}

const SetTaskListItem = (props: SetTaskListItemProps) => {
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

  return (
    <div className="set-task-list-item">
      <div className="set-task-list-item__position">
        <h3 className="set-task-list-item__title">タスクの割り当て</h3>
        <button className="set-task-list-item__btn-position" onClick={() => props.closeModal()}>
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
};

export default SetTaskListItem;
