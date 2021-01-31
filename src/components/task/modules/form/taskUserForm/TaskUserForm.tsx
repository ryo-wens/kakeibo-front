import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import './task-user-form.scss';
import { ApprovedGroupUsers } from '../../../../../reducks/groups/types';

interface TaskUserFormProps {
  title: string;
  buttonLabel: string;
  checkedUserIds: string[];
  displayTaskUserList: ApprovedGroupUsers;
  operateTaskUsers: () => void;
  closeTaskUserOperation: () => void;
  closeModal: () => void;
  handleChangeChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  existsDisplayTaskUsers: boolean;
  message: string;
  buttonClassName: string;
}

const TaskUserForm = (props: TaskUserFormProps) => {
  return (
    <>
      <div className="task-user-form__position">
        <button className="task-user-form__back-btn" onClick={() => props.closeTaskUserOperation()}>
          <ChevronLeftIcon />
        </button>
        <h3 className="task-user-form__title">{props.title}</h3>
        <button className="task-user-form__close-btn" onClick={() => props.closeModal()}>
          <CloseIcon />
        </button>
      </div>
      {props.existsDisplayTaskUsers ? (
        <>
          <ul className="task-user-form__items">
            {props.displayTaskUserList.map((user) => {
              return (
                <li className="task-user-form__item" key={user.user_id}>
                  <label className="task-user-form__check">
                    <input
                      type="checkbox"
                      checked={props.checkedUserIds.includes(user.user_id)}
                      value={user.user_id}
                      onChange={props.handleChangeChecked}
                    />
                    <span />
                  </label>
                  <span className="task-user-form__user-name">{user.user_name}</span>
                </li>
              );
            })}
          </ul>
          <button
            className={props.buttonClassName}
            disabled={props.checkedUserIds.length === 0}
            onClick={props.operateTaskUsers}
          >
            {props.buttonLabel}
          </button>
        </>
      ) : (
        <p className="task-user-form__message">{props.message}</p>
      )}
    </>
  );
};

export default TaskUserForm;
