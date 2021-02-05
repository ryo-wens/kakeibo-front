import React from 'react';
import { TaskCycleType } from '../../../../../reducks/groupTasks/types';
import Modal from '@material-ui/core/Modal';
import { Group } from '../../../../../reducks/groups/types';
import './assignment-task-modal.scss';
import AddIcon from '@material-ui/icons/Add';
import AssignmentTaskForm from '../../../modules/form/assignmentTaskForm/AssignmentTaskForm';

interface AssignmentTaskModalProps {
  approvedGroup: Group;
  groupId: number;
  taskNameFormElement: JSX.Element;
  open: boolean;
  taskItemId: number;
  taskName: string;
  baseDate: Date | null;
  cycleType: TaskCycleType;
  cycle: number;
  taskUserId: number;
  openModal: () => void;
  handleDateChange: (date: Date | null) => void;
  selectCycleType: (event: React.ChangeEvent<{ value: string }>) => void;
  inputTaskCycle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectTaskUser: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  assignmentTask: () => void;
  closeModal: () => void;
  disabledButton: boolean;
  message: string;
}

const AssignmentTaskModal = (props: AssignmentTaskModalProps) => {
  return (
    <>
      <button className="assignment-task-modal__btn" onClick={() => props.openModal()}>
        <AddIcon />
        タスクを割り当てる
      </button>
      <Modal open={props.open} onClose={props.closeModal}>
        <AssignmentTaskForm
          approvedGroup={props.approvedGroup}
          groupId={props.groupId}
          taskNameFormElement={props.taskNameFormElement}
          buttonLabel={'追加'}
          taskItemId={props.taskItemId}
          taskName={props.taskName}
          baseDate={props.baseDate}
          cycleType={props.cycleType}
          cycle={props.cycle}
          taskUserId={props.taskUserId}
          handleDateChange={props.handleDateChange}
          selectCycleType={props.selectCycleType}
          inputTaskCycle={props.inputTaskCycle}
          selectTaskUser={props.selectTaskUser}
          assignmentTask={props.assignmentTask}
          closeModal={props.closeModal}
          disabledButton={props.disabledButton}
          message={props.message}
        />
      </Modal>
    </>
  );
};

export default AssignmentTaskModal;
