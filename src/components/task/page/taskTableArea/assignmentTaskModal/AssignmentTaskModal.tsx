import React from 'react';
import { TaskCycleType, TaskUsers } from '../../../../../reducks/groupTasks/types';
import Modal from '@material-ui/core/Modal';
import './assignment-task-modal.scss';
import AddIcon from '@material-ui/icons/Add';
import AssignmentTaskForm from '../../../modules/form/assignmentTaskForm/AssignmentTaskForm';

interface AssignmentTaskModalProps {
  participatingTaskUsers: TaskUsers;
  taskNameFormElement: JSX.Element;
  open: boolean;
  baseDate: Date | null;
  cycleType: TaskCycleType;
  cycle: number;
  taskUserId: number;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleDateChange: (date: Date | null) => void;
  handleCycleTypeChange: (event: React.ChangeEvent<{ value: string }>) => void;
  handleCycleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskUserChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAssignTaskItem: () => void;
  disabledButton: boolean;
  message: string;
}

const AssignmentTaskModal = (props: AssignmentTaskModalProps) => {
  return (
    <>
      <button className="assignment-task-modal__btn" onClick={() => props.handleOpenModal()}>
        <AddIcon />
        タスクを割り当てる
      </button>
      <Modal open={props.open} onClose={props.handleCloseModal}>
        <AssignmentTaskForm
          participatingTaskUsers={props.participatingTaskUsers}
          taskNameFormElement={props.taskNameFormElement}
          buttonLabel={'追加'}
          baseDate={props.baseDate}
          cycleType={props.cycleType}
          cycle={props.cycle}
          taskUserId={props.taskUserId}
          handleDateChange={props.handleDateChange}
          handleCycleTypeChange={props.handleCycleTypeChange}
          handleCycleChange={props.handleCycleChange}
          handleTaskUserChange={props.handleTaskUserChange}
          handleAssignTaskItem={props.handleAssignTaskItem}
          handleCloseModal={props.handleCloseModal}
          disabledButton={props.disabledButton}
          message={props.message}
        />
      </Modal>
    </>
  );
};

export default AssignmentTaskModal;
