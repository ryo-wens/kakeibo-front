import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './assignment-task-form.scss';
import { DatePicker, InputInteger } from '../../../../uikit';
import { TaskCycleType, TaskUsers } from '../../../../../reducks/groupTasks/types';
import SelectTaskCycleType from '../../select/SelectTaskCycleType';
import SelectTaskUser from '../../select/SelectTaskUser';

interface AssignmentTaskFormProps {
  participatingTaskUsers: TaskUsers;
  taskNameFormElement: JSX.Element;
  buttonLabel: string;
  baseDate: Date | null;
  cycleType: TaskCycleType;
  cycle: number;
  taskUserId: number;
  handleDateChange: (date: Date | null) => void;
  selectCycleType: (event: React.ChangeEvent<{ value: string }>) => void;
  inputTaskCycle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectTaskUser: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  assignmentTask: () => void;
  closeModal: () => void;
  disabledButton: boolean;
  message: string;
  releaseAssignmentTask?: () => void;
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
          onChange={props.handleDateChange}
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
        <SelectTaskCycleType cycleType={props.cycleType} selectCycleType={props.selectCycleType} />
      ),
    },
    {
      key: 'サイクル日数',
      value: (
        <>
          <InputInteger
            value={props.cycle}
            inputTaskCycle={props.inputTaskCycle}
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
          selectTaskUser={props.selectTaskUser}
        />
      ),
    },
  ];

  return (
    <div className="assignment-task-form">
      <div className="assignment-task-form__position">
        <h3 className="assignment-task-form__title">タスクの割り当て</h3>
        <button className="assignment-task-form__btn-position" onClick={() => props.closeModal()}>
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
            onClick={props.assignmentTask}
          >
            {props.buttonLabel}
          </button>
          <button
            className="assignment-task-form__operation-btn--cancel"
            onClick={() => props.closeModal()}
          >
            キャンセル
          </button>
        </div>
        {props.releaseAssignmentTask && (
          <button
            className="assignment-task-form__operation-btn--release"
            onClick={props.releaseAssignmentTask}
          >
            解除
          </button>
        )}
      </div>
    </div>
  );
};

export default AssignmentTaskForm;
