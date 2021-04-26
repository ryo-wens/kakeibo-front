import React from 'react';
import styles from './TaskUserForm.module.scss';
import { ApprovedGroupUsers } from '../../../../../reducks/groups/types';
import ModalFormLayout from '../../../../uikit/form/formLayout/ModalFormLayout';

interface TaskUserFormProps {
  title: string;
  buttonLabel: string;
  checkedUserIds: string[];
  displayTaskUserList: ApprovedGroupUsers;
  handleCloseModal: () => void;
  handleCloseTaskUserForm: () => void;
  handleChangeChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  existsDisplayTaskUsers: boolean;
  handleTaskUsers: () => void;
  message: string;
  btnClassName: string;
}

const TaskUserForm = (props: TaskUserFormProps) => {
  return (
    <ModalFormLayout
      titleLabel={props.title}
      handleClose={props.handleCloseModal}
      handleBack={props.handleCloseTaskUserForm}
    >
      {props.existsDisplayTaskUsers ? (
        <>
          <ul className={styles.items}>
            {props.displayTaskUserList.map((user) => {
              return (
                <li className={styles.item} key={user.user_id}>
                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      checked={props.checkedUserIds.includes(user.user_id)}
                      value={user.user_id}
                      onChange={props.handleChangeChecked}
                    />
                    <span />
                  </label>
                  <span className={styles.userName}>{user.user_name}</span>
                </li>
              );
            })}
          </ul>
          <button
            className={props.btnClassName}
            disabled={props.checkedUserIds.length === 0}
            onClick={props.handleTaskUsers}
          >
            {props.buttonLabel}
          </button>
        </>
      ) : (
        <p className={styles.message}>{props.message}</p>
      )}
    </ModalFormLayout>
  );
};

export default TaskUserForm;
