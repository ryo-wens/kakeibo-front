import React from 'react';
import Modal from '@material-ui/core/Modal';
import styles from './EditTaskUserModal.module.scss';
import '../../../../../../assets/modules/task-btn.scss';
import { GroupTaskListForEachUser, TaskUsers } from '../../../../../../reducks/groupTasks/types';
import { Group } from '../../../../../../reducks/groups/types';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddTaskUserFormContainer from '../../../../../../containers/task/page/taskToolBarArea/editTaskUserModalContainer/taskUserForm/AddTaskUserFormContainer';
import DeleteTaskUserFormContainer from '../../../../../../containers/task/page/taskToolBarArea/editTaskUserModalContainer/taskUserForm/DeleteTaskUserFormContainer';
import ModalFormLayout from '../../../../../uikit/form/formLayout/ModalFormLayout';

interface EditTaskUserModalProps {
  open: boolean;
  openEditUserForm: boolean;
  openAddUserForm: boolean;
  openDeleteUserForm: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleOpenAddTaskUserForm: () => void;
  handleCloseAddTaskUserForm: () => void;
  handleOpenDeleteTaskUserForm: () => void;
  handleCloseDeleteTaskUserForm: () => void;
  approvedGroup: Group;
  groupTasksListForEachUser: GroupTaskListForEachUser;
  participatingTaskUsers: TaskUsers;
}

const EditTaskUserModal = (props: EditTaskUserModalProps) => {
  return (
    <>
      <button className={styles.btn} disabled={false} onClick={props.handleOpenModal}>
        タスクユーザーを編集
      </button>
      <Modal open={props.open} onClose={props.handleCloseModal}>
        <div className={styles.modalWrapper}>
          {props.openEditUserForm && (
            <ModalFormLayout
              titleLabel={'タスクユーザーリスト'}
              handleClose={props.handleCloseModal}
            >
              <div className={styles.content}>
                {!props.groupTasksListForEachUser.length ? (
                  <p className={styles.message}>現在、タスクに参加しているメンバーはいません。</p>
                ) : (
                  <ul className={styles.userList}>
                    {props.participatingTaskUsers.map((user) => {
                      return (
                        <li className={styles.userListItem} key={user.user_id}>
                          {user.user_name}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <button className={styles.selectBtn} onClick={props.handleOpenAddTaskUserForm}>
                  <span>タスクユーザーを追加</span>
                  <ChevronRightIcon />
                </button>
                <button className={styles.selectBtn} onClick={props.handleOpenDeleteTaskUserForm}>
                  <span>タスクユーザーを削除</span>
                  <ChevronRightIcon />
                </button>
              </div>
            </ModalFormLayout>
          )}
          {!props.openEditUserForm && props.openAddUserForm && (
            <AddTaskUserFormContainer
              approvedGroup={props.approvedGroup}
              handleCloseAddTaskUserForm={props.handleCloseAddTaskUserForm}
              handleCloseModal={props.handleCloseModal}
              groupTasksListForEachUser={props.groupTasksListForEachUser}
              btnClassName={styles.childAddBtn}
            />
          )}
          {!props.openEditUserForm && props.openDeleteUserForm && (
            <DeleteTaskUserFormContainer
              approvedGroup={props.approvedGroup}
              handleCloseDeleteTaskUserForm={props.handleCloseDeleteTaskUserForm}
              handleCloseModal={props.handleCloseModal}
              groupTasksListForEachUser={props.groupTasksListForEachUser}
              btnClassName={styles.childDeleteBtn}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default EditTaskUserModal;
