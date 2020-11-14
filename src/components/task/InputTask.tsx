import React from 'react';
import { TextInput } from '../todo';
import { useDispatch } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { State } from '../../reducks/store/types';
import '../../assets/task/input-task-user.scss';

interface InputTaskProps {
  buttonLabel: string;
  titleLabel: string;
  groupId: number;
  inputTaskClose: () => void;
  inputTaskName: (event: React.ChangeEvent<{ value: string }>) => void;
  noDifferenceTaskName: boolean;
  operation: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
  taskName: string;
  deleteOperation?: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
}

const InputTask = (props: InputTaskProps) => {
  const dispatch = useDispatch();
  const isBlankTaskName = props.taskName === '';

  return (
    <>
      <div className="input-task-user">
        <p className="input-task-user__title">タスクを{props.titleLabel}</p>
        <TextInput
          id="filled-basic"
          variant="filled"
          required={true}
          rows={1}
          type={'text'}
          value={props.taskName}
          onChange={props.inputTaskName}
        />
        <div className="input-task-user__btn">
          <div>
            <button
              className="input-task-user__btn--add"
              disabled={isBlankTaskName || props.noDifferenceTaskName}
              onClick={() => dispatch(props.operation) && props.inputTaskClose()}
            >
              {props.buttonLabel}
            </button>
            <button
              className="input-task-user__btn--cancel"
              disabled={false}
              onClick={() => props.inputTaskClose()}
            >
              キャンセル
            </button>
          </div>
          {props.titleLabel === '変更' && (
            <button
              className="input-task-user__btn--delete"
              onClick={() => dispatch(props.deleteOperation) && props.inputTaskClose()}
            >
              削除
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputTask;
