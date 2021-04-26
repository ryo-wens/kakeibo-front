import React from 'react';
import { TaskCycleType, TaskUsers } from '../../../../../../../reducks/groupTasks/types';
import Modal from '@material-ui/core/Modal';
import AssignTaskForm from '../../../../form/assignTaskForm/AssignTaskForm';
import styles from './EditAssignTaskModal.module.scss';

interface EditAssignTaskModalProps {
  participatingTaskUsers: TaskUsers;
  taskNameFormElement: JSX.Element;
  initialTaskName: string;
  open: boolean;
  baseDate: Date | null;
  cycleType: TaskCycleType;
  cycle: number;
  taskUserId: number;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleChangeDate: (date: Date | null) => void;
  handleChangeCycleType: (event: React.ChangeEvent<{ value: string }>) => void;
  handleChangeCycle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTaskUser: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleEditAssignTaskItem: () => void;
  handleReleaseTaskItem: () => void;
  disabledButton: boolean;
  message: string;
}

const EditAssignTaskModal = (props: EditAssignTaskModalProps) => {
  return (
    <>
      <th className={styles.taskName} onClick={() => props.handleOpenModal()}>
        <span>{props.initialTaskName}</span>
      </th>
      <Modal open={props.open} onClose={props.handleCloseModal}>
        <div className={styles.modalWrapper}>
          <AssignTaskForm
            participatingTaskUsers={props.participatingTaskUsers}
            taskNameFormElement={props.taskNameFormElement}
            buttonLabel={'保存'}
            baseDate={props.baseDate}
            cycleType={props.cycleType}
            cycle={props.cycle}
            taskUserId={props.taskUserId}
            handleChangeDate={props.handleChangeDate}
            handleChangeCycleType={props.handleChangeCycleType}
            handleChangeCycle={props.handleChangeCycle}
            handleChangeTaskUser={props.handleChangeTaskUser}
            handleCloseModal={props.handleCloseModal}
            handleAssignTaskItem={props.handleEditAssignTaskItem}
            disabledButton={props.disabledButton}
            title={'割り当てたタスクの編集'}
            message={props.message}
            handleReleaseTaskItem={props.handleReleaseTaskItem}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditAssignTaskModal;
