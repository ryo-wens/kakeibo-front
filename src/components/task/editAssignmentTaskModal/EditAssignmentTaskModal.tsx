import React from 'react';
import { TaskCycleType } from '../../../reducks/groupTasks/types';
import Modal from '@material-ui/core/Modal';
import { Group } from '../../../reducks/groups/types';
import AssignmentTaskForm from '../modules/form/assignmentTaskForm/AssignmentTaskForm';
import './edit-assignment-task-modal.scss';

interface EditAssignmentTaskModalProps {
  approvedGroup: Group;
  groupId: number;
  taskNameFormElement: JSX.Element;
  initialTaskName: string;
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
  releaseAssignmentTask?: () => void;
}

const EditAssignmentTaskModal = (props: EditAssignmentTaskModalProps) => {
  return (
    <>
      <th className="edit-assignment-task-modal__task-name" onClick={() => props.openModal()}>
        {props.initialTaskName}
      </th>
      <Modal open={props.open} onClose={props.closeModal}>
        <AssignmentTaskForm
          approvedGroup={props.approvedGroup}
          groupId={props.groupId}
          taskNameFormElement={props.taskNameFormElement}
          buttonLabel={'保存'}
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
          releaseAssignmentTask={props.releaseAssignmentTask}
        />
      </Modal>
    </>
  );
};

export default EditAssignmentTaskModal;
