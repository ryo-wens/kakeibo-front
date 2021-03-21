import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import styles from './TaskUserForm.module.scss';
import { ApprovedGroupUsers } from '../../../../../reducks/groups/types';

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
    <>
      <div className={styles.position}>
        <button className={styles.backBtn} onClick={props.handleCloseTaskUserForm}>
          <ChevronLeftIcon />
        </button>
        <h3 className={styles.title}>{props.title}</h3>
        <button className={styles.closeBtn} onClick={props.handleCloseModal}>
          <CloseIcon />
        </button>
      </div>
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
    </>
  );
};

export default TaskUserForm;
