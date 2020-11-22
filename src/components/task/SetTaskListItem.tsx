import React, { useCallback, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/task/set-task-list-item.scss';
import { DatePicker, DeleteButton, InputInteger, SaveButton } from '../uikit';
import { SelectCycleType, SelectTaskName, SelectTaskUser } from './index';
import { GroupTasksList, GroupTasksListForEachUser } from '../../reducks/groupTasks/types';
import { date } from '../../lib/constant';
import { Group, Groups } from '../../reducks/groups/types';
import { useDispatch } from 'react-redux';
import { editTaskItem } from '../../reducks/groupTasks/operations';

interface SetTaskListItemProps {
  approvedGroups: Groups;
  approvedGroup: Group;
  groupId: number;
  groupTasksList: GroupTasksList;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  closeModal: () => void;
}

const SetTaskListItem = (props: SetTaskListItemProps) => {
  const dispatch = useDispatch();
  const [taskItemName, setTaskItemName] = useState<string>('');
  const [taskItemId, setTaskItemId] = useState<number>(0);
  const [baseDate, setBaseDate] = useState<Date>(date);
  const [cycleType, setCycleType] = useState<'every' | 'consecutive' | 'none'>('every');
  const [cycle, setCycle] = useState<number>(1);
  const [message, setMessage] = useState<string>('');
  const [taskUserId, setTaskUserId] = useState<number>(0);

  const selectTaskName = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value !== String(0)) {
        const idx = props.groupTasksList.findIndex(
          (groupTaskListItem) => groupTaskListItem.id === Number(event.target.value)
        );
        setTaskItemName(props.groupTasksList[idx].task_name);
      } else if (event.target.value === String(0)) {
        setTaskItemName('');
      }
      setTaskItemId(Number(event.target.value));
    },
    [setTaskItemName]
  );

  const handleDateChange = useCallback(
    (selectedDate) => {
      setBaseDate(selectedDate as Date);
    },
    [setBaseDate]
  );

  const selectCycleType = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      setCycleType(event.target.value as 'every' | 'consecutive' | 'none');
    },
    [setCycleType]
  );

  const selectTaskUser = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setTaskUserId(Number(event.target.value));
    },
    [setTaskUserId]
  );

  const inputCycle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isNaN(Number(event.target.value))) {
        setMessage('半角数字のみ入力可能です');
      } else {
        setCycle(Number(event.target.value));
        setMessage('');
      }
    },
    [setCycle]
  );

  const selectContents = [
    {
      key: 'タスク名',
      value: (
        <SelectTaskName groupTasksList={props.groupTasksList} selectTaskName={selectTaskName} />
      ),
    },
    {
      key: '基準日',
      value: (
        <DatePicker
          value={baseDate}
          onChange={handleDateChange}
          id={'date-picker-dialog'}
          label={''}
          required={false}
        />
      ),
    },
    {
      key: 'サイクルタイプ',
      value: <SelectCycleType selectCycleType={selectCycleType} />,
    },
    {
      key: 'サイクル',
      value: (
        <InputInteger
          name={'cycle'}
          value={cycle}
          required={true}
          onChange={inputCycle}
          message={message}
        />
      ),
    },
    {
      key: 'タスクユーザー',
      value: (
        <SelectTaskUser
          groupId={props.groupId}
          approvedGroups={props.approvedGroups}
          groupTasksListForEachUser={props.groupTasksListForEachUser}
          selectTaskUser={selectTaskUser}
        />
      ),
    },
  ];

  const existsSelectTaskName = taskItemName === '';
  const existsSelectTaskId = taskItemId === 0;
  const existsCycle = cycle === 0;
  const existsTaskUserId = taskUserId === 0;

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
          disabled={existsSelectTaskName || existsSelectTaskId || existsCycle || existsTaskUserId}
          onClick={() =>
            dispatch(
              editTaskItem(
                props.groupId,
                taskItemId,
                baseDate,
                cycleType,
                cycle,
                taskItemName,
                taskUserId
              )
            ) && props.closeModal()
          }
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
