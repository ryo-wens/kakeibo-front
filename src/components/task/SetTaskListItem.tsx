import React, { useCallback, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import '../../assets/task/set-task-list-item.scss';
import { DatePicker, DeleteButton, InputInteger, SaveButton } from '../uikit';
import { isValidBudgetFormat, isValidPreventBeginningZero } from '../../lib/validation';
import { SelectCycleType, SelectTaskName } from './index';
import { GroupTasksList } from '../../reducks/groupTasks/types';
import { date } from '../../lib/constant';

interface SetTaskListItemProps {
  groupTasksList: GroupTasksList;
  closeModal: () => void;
}

const SetTaskListItem = (props: SetTaskListItemProps) => {
  const [taskName, setTaskName] = useState<string>('');
  const [selectDate, setSelectDate] = useState<Date>(date);
  const [cycleType, setCycleType] = useState<'every' | 'consecutive' | 'none' | null>('every');
  const [cycle, setCycle] = useState<number>(1);

  const selectTaskName = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      console.log(taskName);
      setTaskName(event.target.value);
    },
    [setTaskName]
  );

  const handleDateChange = useCallback(
    (selectedDate) => {
      setSelectDate(selectedDate as Date);
    },
    [setSelectDate]
  );

  const selectCycleType = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      console.log(cycleType);
      if (event.target.value !== 'null') {
        setCycleType(event.target.value as 'every' | 'consecutive' | 'none');
      } else if (event.target.value === 'null') {
        setCycleType(null);
      }
    },
    [setCycleType]
  );

  const inputCycle = useCallback(
    (event) => {
      setCycle(event.target.value);
    },
    [setCycle]
  );

  const switchMessage = () => {
    if (!cycle) {
      return '必須項目です';
    } else if (isValidPreventBeginningZero(cycle)) {
      return '先頭に0は入力できません';
    } else if (!isValidBudgetFormat(cycle)) {
      return '整数のみ入力可能です';
    } else {
      return '';
    }
  };

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
          value={selectDate}
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
          message={switchMessage()}
        />
      ),
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
