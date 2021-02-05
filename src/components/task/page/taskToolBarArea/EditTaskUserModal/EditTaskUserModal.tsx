import React from 'react';
import Modal from '@material-ui/core/Modal';
import './edit-task-user-modal.scss';
import '../../../../../assets/modules/task-btn.scss';
import { GroupTasksListForEachUser, TaskUsers } from '../../../../../reducks/groupTasks/types';
import { Group } from '../../../../../reducks/groups/types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import AddTaskUserFormContainer from '../../../../../containers/task/page/taskToolBarAreaContainer/editTaskUserModalContainer/taskUserForm/AddTaskUserFormContainer';
import DeleteTaskUserFormContainer from '../../../../../containers/task/page/taskToolBarAreaContainer/editTaskUserModalContainer/taskUserForm/DeleteTaskUserFormContainer';

interface EditTaskUserModalProps {
  open: boolean;
  openEditUserForm: boolean;
  openAddUserForm: boolean;
  openDeleteUserForm: boolean;
  openModal: () => void;
  closeModal: () => void;
  openAddTaskUser: () => void;
  openDeleteTaskUser: () => void;
  closeAddTaskUser: () => void;
  closeDeleteTaskUser: () => void;
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTasksListForEachUser;
  participatingTaskUsers: TaskUsers;
}

const EditTaskUserModal = (props: EditTaskUserModalProps) => {
  const switchTaskUserForm = () => {
    if (props.openEditUserForm && !props.openAddUserForm) {
      return (
        <>
          <div className="edit-task-user-modal__position">
            <h3 className="edit-task-user-modal__title">タスクユーザーリスト</h3>
            <button
              className="edit-task-user-modal__btn-position"
              onClick={() => props.closeModal()}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="edit-task-user-modal__content">
            {!props.groupTasksListForEachUser.length ? (
              <p className="edit-task-user-modal__message">
                現在、タスクに参加しているメンバーはいません。
              </p>
            ) : (
              <ul className="edit-task-user-modal__user-list">
                {props.participatingTaskUsers.map((user) => {
                  return (
                    <li className="edit-task-user-modal__user-list-item" key={user.user_id}>
                      {user.user_name}
                    </li>
                  );
                })}
              </ul>
            )}
            <div
              className="edit-task-user-modal__choice-position"
              onClick={() => props.openAddTaskUser()}
            >
              <span className="edit-task-user-modal__choice">タスクユーザーを追加</span>
              <ChevronRightIcon className="edit-task-user-modal__choice-icon" />
            </div>
            <div
              className="edit-task-user-modal__choice-position"
              onClick={() => props.openDeleteTaskUser()}
            >
              <span className="edit-task-user-modal__choice">タスクユーザーを削除</span>
              <ChevronRightIcon className="edit-task-user-modal__choice-icon" />
            </div>
          </div>
        </>
      );
    } else if (!props.openEditUserForm && props.openAddUserForm) {
      return (
        <AddTaskUserFormContainer
          approvedGroup={props.approvedGroup}
          closeTaskUserOperation={props.closeAddTaskUser}
          closeModal={props.closeModal}
          groupTasksListForEachUser={props.groupTasksListForEachUser}
        />
      );
    } else if (!props.openEditUserForm && props.openDeleteUserForm) {
      return (
        <DeleteTaskUserFormContainer
          approvedGroup={props.approvedGroup}
          closeTaskUserOperation={props.closeDeleteTaskUser}
          closeModal={props.closeModal}
          groupTasksListForEachUser={props.groupTasksListForEachUser}
        />
      );
    }
  };

  return (
    <div>
      <button className="task--btn" disabled={false} onClick={() => props.openModal()}>
        タスクユーザーを編集
      </button>
      <Modal
        open={props.open}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="edit-task-user-modal">{switchTaskUserForm()}</div>
      </Modal>
    </div>
  );
};

export default EditTaskUserModal;
