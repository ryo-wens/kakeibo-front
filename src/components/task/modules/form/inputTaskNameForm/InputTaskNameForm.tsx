import React from 'react';
import './input-task-name-form.scss';
import { TextInput } from '../../../../uikit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteModal from '../../../../uikit/modal/deleteModal/DeleteModal';

interface InputTaskNameFormProps {
  titleLabel: string;
  buttonLabel: string;
  taskName: string;
  handleChangeTaskName: (event: React.ChangeEvent<{ value: string }>) => void;
  disabledButton: boolean;
  handleCloseInputTaskForm: () => void;
  handleTaskItem: () => void;
  handleDeleteTaskItem?: () => void;
  onClickCloseInputTaskNameForm?: (event: Event) => void;
}

const InputTaskNameForm = React.forwardRef(
  (props: InputTaskNameFormProps, inputTaskRef: React.Ref<HTMLDivElement>) => {
    return (
      <div className="input-task-name-form" ref={inputTaskRef as React.RefObject<HTMLDivElement>}>
        <div className="input-task-name-form__title">
          <p className="input-task-name-form__title--text">{props.titleLabel}</p>
          <button
            className="input-task-name-form__title--close-btn"
            onClick={props.handleCloseInputTaskForm}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="input-task-name-form__text-input">
          <TextInput
            id="task-name"
            label={''}
            value={props.taskName}
            onChange={props.handleChangeTaskName}
            required={true}
            type={'text'}
            fullWidth={false}
            disabled={false}
          />
        </div>
        <div className="input-task-name-form__btn">
          <div>
            <button
              className="input-task-name-form__btn--add"
              disabled={props.disabledButton}
              onClick={props.handleTaskItem}
            >
              {props.buttonLabel}
            </button>
            <button
              className="input-task-name-form__btn--cancel"
              onClick={props.handleCloseInputTaskForm}
            >
              キャンセル
            </button>
          </div>
          {props.handleDeleteTaskItem && (
            <DeleteModal
              title={'タスクを削除'}
              buttonLabel={'削除'}
              contentName={props.taskName}
              disabled={false}
              onClickDelete={props.handleDeleteTaskItem}
              onClickCloseInputForm={props.onClickCloseInputTaskNameForm}
            />
          )}
        </div>
      </div>
    );
  }
);

InputTaskNameForm.displayName = 'InputTaskNameForm';
export default InputTaskNameForm;
