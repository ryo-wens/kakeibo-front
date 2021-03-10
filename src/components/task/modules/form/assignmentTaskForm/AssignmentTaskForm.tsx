import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './assignment-task-form.scss';
import { DatePicker } from '../../../../uikit';
import { TaskCycleType, TaskUsers } from '../../../../../reducks/groupTasks/types';
import SelectTaskCycleType from '../../select/SelectTaskCycleType';
import SelectTaskUser from '../../select/SelectTaskUser';
import InputTaskCycle from '../../input/inputTaskCycle/InputTaskCycle';

interface AssignmentTaskFormProps {
  participatingTaskUsers: TaskUsers;
  taskNameFormElement: JSX.Element;
  buttonLabel: string;
  baseDate: Date | null;
  cycleType: TaskCycleType;
  cycle: number;
  taskUserId: number;
  handleChangeDate: (date: Date | null) => void;
  handleChangeCycleType: (event: React.ChangeEvent<{ value: string }>) => void;
  handleChangeCycle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTaskUser: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAssignTaskItem: () => void;
  handleCloseModal: () => void;
  disabledButton: boolean;
  message: string;
  handleReleaseTaskItem?: () => void;
}

const AssignmentTaskForm = (props: AssignmentTaskFormProps) => {
  const selectContents = [
    {
      key: 'タスク名',
      value: props.taskNameFormElement,
    },
    {
      key: '基準日',
      value: (
        <DatePicker
          value={props.baseDate}
          onChange={props.handleChangeDate}
          id={'date-picker-dialog'}
          label={''}
          required={false}
          disabled={false}
          minDate={new Date('1900-01-01')}
        />
      ),
    },
    {
      key: 'サイクルタイプ',
      value: (
        <SelectTaskCycleType
          cycleType={props.cycleType}
          handleChangeCycleType={props.handleChangeCycleType}
        />
      ),
    },
    {
      key: 'サイクル日数',
      value: (
        <>
          <InputTaskCycle
            value={props.cycle}
            handleChangeCycle={props.handleChangeCycle}
            cycleType={props.cycleType}
          />
          <p className="assignment-task-form__message">{props.message}</p>
        </>
      ),
    },
    {
      key: '割り当てるユーザー',
      value: (
        <SelectTaskUser
          participatingTaskUsers={props.participatingTaskUsers}
          taskUserId={props.taskUserId}
          handleChangeTaskUser={props.handleChangeTaskUser}
        />
      ),
    },
  ];

  return (
    <div className="assignment-task-form">
      <div className="assignment-task-form__position">
        <h3 className="assignment-task-form__title">タスクの割り当て</h3>
        <button className="assignment-task-form__btn-position" onClick={props.handleCloseModal}>
          <CloseIcon />
        </button>
      </div>
      <div className="assignment-task-form__select-contents-test">
        {selectContents.map((selectContent) => {
          return (
            <div className="assignment-task-form__select-contents" key={selectContent.key}>
              <span className="assignment-task-form__select-contents--key">
                {selectContent.key}
              </span>
              <span className="assignment-task-form__select-contents--value">
                {selectContent.value}
              </span>
            </div>
          );
        })}
      </div>
      <div className="assignment-task-form__operation-btn">
        <div>
          <button
            className="assignment-task-form__operation-btn--add"
            disabled={props.disabledButton}
            onClick={props.handleAssignTaskItem}
          >
            {props.buttonLabel}
          </button>
          <button
            className="assignment-task-form__operation-btn--cancel"
            onClick={props.handleCloseModal}
          >
            キャンセル
          </button>
        </div>
        {props.handleReleaseTaskItem && (
          <button
            className="assignment-task-form__operation-btn--release"
            onClick={props.handleReleaseTaskItem}
          >
            解除
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentTaskForm;
