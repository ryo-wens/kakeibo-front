import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/task/set-task-list-item.scss';
import { DatePicker, DeleteButton, InputInteger, SaveButton } from '../uikit';
import { SelectCycleType, SelectTaskName, SelectTaskUser } from './index';
import { Group } from '../../reducks/groups/types';
import { useDispatch, useSelector } from 'react-redux';
import { editTaskItem } from '../../reducks/groupTasks/operations';
import { State } from '../../reducks/store/types';
import {
  getGroupTasksList,
  getGroupTasksListForEachUser,
} from '../../reducks/groupTasks/selectors';
import { getApprovedGroups } from '../../reducks/groups/selectors';

interface SetTaskListItemProps {
  approvedGroup: Group;
  groupId: number;
  closeModal: () => void;
  handleDateChange: (date: Date | null) => void;
  inputTaskName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  taskItemName: string;
  setTaskItemName: React.Dispatch<React.SetStateAction<string>>;
  taskItemId: number;
  setTaskItemId: React.Dispatch<React.SetStateAction<number>>;
  baseDate: Date | null;
  setBaseDate: React.Dispatch<React.SetStateAction<Date | null>>;
  cycleType: 'every' | 'consecutive' | 'none';
  setCycleType: React.Dispatch<React.SetStateAction<'every' | 'consecutive' | 'none'>>;
  cycle: number;
  setCycle: React.Dispatch<React.SetStateAction<number>>;
  taskUserId: number;
  setTaskUserId: React.Dispatch<React.SetStateAction<number>>;
}

const SetTaskListItem = (props: SetTaskListItemProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const groupTasksListForEachUser = getGroupTasksListForEachUser(selector);
  const groupTasksList = getGroupTasksList(selector);

  const [message, setMessage] = useState<string>('');

  const switchTaskName = () => {
    if (props.label === '保存') {
      return (
        <input
          id="filled-basic"
          required={true}
          type={'text'}
          value={props.taskItemName}
          onChange={props.inputTaskName}
        />
      );
    } else if (props.label === '追加') {
      return (
        <SelectTaskName
          groupTasksList={groupTasksList}
          setTaskItemId={props.setTaskItemId}
          setTaskItemName={props.setTaskItemName}
        />
      );
    }
  };

  const selectContents = [
    {
      key: 'タスク名',
      value: switchTaskName(),
    },
    {
      key: '基準日',
      value: (
        <DatePicker
          value={props.baseDate}
          onChange={props.handleDateChange}
          id={'date-picker-dialog'}
          label={''}
          required={false}
        />
      ),
    },
    {
      key: 'サイクルタイプ',
      value: <SelectCycleType cycleType={props.cycleType} setCycleType={props.setCycleType} />,
    },
    {
      key: 'サイクル',
      value: (
        <InputInteger
          value={props.cycle}
          message={message}
          setCycle={props.setCycle}
          setMessage={setMessage}
        />
      ),
    },
    {
      key: '割り当てるユーザー',
      value: (
        <SelectTaskUser
          groupId={props.groupId}
          approvedGroups={approvedGroups}
          groupTasksListForEachUser={groupTasksListForEachUser}
          taskUserId={props.taskUserId}
          setTaskUserId={props.setTaskUserId}
          label={props.label}
        />
      ),
    },
  ];

  const existsSelectTaskName = props.taskItemName === '';
  const existsSelectTaskId = props.taskItemId === 0;
  const existsCycle = props.cycle === 0;
  const existsTaskUserId = props.taskUserId === 0;

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
          label={props.label}
          disabled={existsSelectTaskName || existsSelectTaskId || existsCycle || existsTaskUserId}
          onClick={() =>
            dispatch(
              editTaskItem(
                props.groupId,
                props.taskItemId,
                props.baseDate,
                props.cycleType,
                props.cycle,
                props.taskItemName,
                props.taskUserId
              )
            ) && props.closeModal()
          }
        />
        {props.label === '保存' && (
          <DeleteButton
            label={'解除'}
            disabled={false}
            onClick={() =>
              dispatch(
                editTaskItem(
                  props.groupId,
                  props.taskItemId,
                  null,
                  null,
                  null,
                  props.taskItemName,
                  null
                )
              ) && props.closeModal()
            }
          />
        )}
      </div>
    </div>
  );
};

export default SetTaskListItem;
