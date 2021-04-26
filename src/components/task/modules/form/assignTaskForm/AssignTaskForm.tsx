import React from 'react';
import styles from './AssignTaskForm.module.scss';
import { DatePicker } from '../../../../uikit';
import { TaskCycleType, TaskUsers } from '../../../../../reducks/groupTasks/types';
import SelectTaskCycleType from '../../select/SelectTaskCycleType';
import SelectTaskUser from '../../select/SelectTaskUser';
import InputTaskCycle from '../../input/inputTaskCycle/InputTaskCycle';
import ModalFormLayout from '../../../../uikit/form/formLayout/ModalFormLayout';

interface AssignTaskFormProps {
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
  title: string;
  message: string;
  handleReleaseTaskItem?: () => void;
}

const AssignTaskForm = (props: AssignTaskFormProps) => {
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
          <p className={styles.message}>{props.message}</p>
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
    <ModalFormLayout titleLabel={props.title} handleClose={props.handleCloseModal}>
      <dl>
        {selectContents.map((selectContent) => {
          return (
            <div className={styles.selectContent} key={selectContent.key}>
              <dt>{selectContent.key}</dt>
              <dd>{selectContent.value}</dd>
            </div>
          );
        })}
      </dl>
      <div className={styles.operationBtn}>
        <div>
          <button
            className={styles.operationBtn__add}
            disabled={props.disabledButton}
            onClick={props.handleAssignTaskItem}
          >
            {props.buttonLabel}
          </button>
          <button className={styles.operationBtn__cancel} onClick={props.handleCloseModal}>
            キャンセル
          </button>
        </div>
        {props.handleReleaseTaskItem && (
          <button className={styles.operationBtn__release} onClick={props.handleReleaseTaskItem}>
            解除
          </button>
        )}
      </div>
    </ModalFormLayout>
  );
};

export default AssignTaskForm;
