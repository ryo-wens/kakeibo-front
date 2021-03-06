import React from 'react';
import { TaskCycleType, TaskUsers } from '../../../../../../reducks/groupTasks/types';
import Modal from '@material-ui/core/Modal';
import styles from './AssignTaskModal.module.scss';
import AddIcon from '@material-ui/icons/Add';
import AssignTaskForm from '../../../form/assignTaskForm/AssignTaskForm';

interface AssignTaskModalProps {
  participatingTaskUsers: TaskUsers;
  taskNameFormElement: JSX.Element;
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
  handleAssignTaskItem: () => void;
  disabledButton: boolean;
  message: string;
}

const AssignTaskModal = (props: AssignTaskModalProps) => {
  return (
    <>
      <button className={styles.btn} onClick={() => props.handleOpenModal()}>
        <AddIcon />
        タスクを割り当てる
      </button>
      <Modal open={props.open} onClose={props.handleCloseModal}>
        <div className={styles.modalWrapper}>
          <AssignTaskForm
            participatingTaskUsers={props.participatingTaskUsers}
            taskNameFormElement={props.taskNameFormElement}
            buttonLabel={'追加'}
            baseDate={props.baseDate}
            cycleType={props.cycleType}
            cycle={props.cycle}
            taskUserId={props.taskUserId}
            handleChangeDate={props.handleChangeDate}
            handleChangeCycleType={props.handleChangeCycleType}
            handleChangeCycle={props.handleChangeCycle}
            handleChangeTaskUser={props.handleChangeTaskUser}
            handleAssignTaskItem={props.handleAssignTaskItem}
            handleCloseModal={props.handleCloseModal}
            disabledButton={props.disabledButton}
            title={'タスクの割り当て'}
            message={props.message}
          />
        </div>
      </Modal>
    </>
  );
};

export default AssignTaskModal;
