import React from 'react';
import { TaskCycleType, TaskUsers } from '../../../../../../reducks/groupTasks/types';
import Modal from '@material-ui/core/Modal';
import AssignmentTaskForm from '../../../../modules/form/assignmentTaskForm/AssignmentTaskForm';
import './edit-assignment-task-modal.scss';

interface EditAssignmentTaskModalProps {
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

const EditAssignmentTaskModal = (props: EditAssignmentTaskModalProps) => {
  return (
    <>
      <th className="edit-assignment-task-modal__task-name" onClick={() => props.handleOpenModal()}>
        {props.initialTaskName}
      </th>
      <Modal open={props.open} onClose={props.handleCloseModal}>
        <AssignmentTaskForm
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
          message={props.message}
          handleReleaseTaskItem={props.handleReleaseTaskItem}
        />
      </Modal>
    </>
  );
};

export default EditAssignmentTaskModal;
