import React from 'react';
import './todo-list-item-form.scss';
import { DatePicker, DeleteButton, TextInput } from '../../../../uikit';
import CloseIcon from '@material-ui/icons/Close';
import { Action, Dispatch } from 'redux';
import { State } from '../../../../../reducks/store/types';

interface TodoListItemFormProps {
  titleLabel: string;
  buttonLabel: string;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputImplementationDate: (date: Date | null) => void;
  inputDueDate: (date: Date | null) => void;
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  todoListItemOperation: () => void;
  disabledButton: boolean;
  closeInputTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  pathName: string;
  deleteOperation?: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
}

const TodoListItemForm = React.forwardRef(
  (props: TodoListItemFormProps, inputTodoRef: React.Ref<HTMLDivElement>) => {
    return (
      <div className="todo-list-item-form" ref={inputTodoRef as React.RefObject<HTMLDivElement>}>
        <div className="todo-list-item-form__title">
          <p className="todo-list-item-form__title--text">{props.titleLabel}</p>
          <button
            className="todo-list-item-form__title--close-btn"
            onClick={() => props.closeInputTodoForm()}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="todo-list-item-form__items">
          <div className="todo-list-item-form__text-input">
            <TextInput
              value={props.todoContent}
              type={'text'}
              id={'shop'}
              label={''}
              onChange={props.handleTodoContentChange}
              required={false}
              fullWidth={false}
              disabled={false}
            />
          </div>
          <div
            className={
              props.pathName === 'home'
                ? 'todo-list-item-form__date--home-page'
                : 'todo-list-item-form__date'
            }
          >
            <div
              className={
                props.pathName === 'home'
                  ? 'todo-list-item-form__date-picker--home-page'
                  : 'todo-list-item-form__date-picker'
              }
            >
              <DatePicker
                id={'date'}
                label={'実施日'}
                value={props.implementationDate}
                onChange={props.inputImplementationDate}
                required={true}
                disabled={false}
                minDate={new Date('1900-01-01')}
                onOpen={() =>
                  document.removeEventListener('click', props.onClickCloseInputTodoForm)
                }
                onClose={() => document.addEventListener('click', props.onClickCloseInputTodoForm)}
              />
            </div>
            <div
              className={
                props.pathName === 'home'
                  ? 'todo-list-item-form__date-picker--home-page'
                  : 'todo-list-item-form__date-picker'
              }
            >
              <DatePicker
                id={'date'}
                label={'締切日'}
                value={props.dueDate}
                onChange={props.inputDueDate}
                required={true}
                disabled={false}
                minDate={props.implementationDate}
                onOpen={() =>
                  document.removeEventListener('click', props.onClickCloseInputTodoForm)
                }
                onClose={() => document.addEventListener('click', props.onClickCloseInputTodoForm)}
              />
            </div>
          </div>
        </div>

        <div className="todo-list-item-form__btn">
          <div>
            <button
              className="todo-list-item-form__btn--save"
              disabled={props.disabledButton}
              onClick={props.todoListItemOperation}
            >
              {props.buttonLabel}
            </button>
            <button
              className="todo-list-item-form__btn--cancel"
              disabled={false}
              onClick={() => {
                props.closeInputTodoForm();
                document.removeEventListener('click', props.onClickCloseInputTodoForm);
              }}
            >
              キャンセル
            </button>
          </div>
          {props.deleteOperation && (
            <DeleteButton
              buttonLabel={'削除'}
              disabled={false}
              contentName={props.todoContent}
              modalTitle={'Todo'}
              onClickDelete={props.deleteOperation}
              onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
            />
          )}
        </div>
      </div>
    );
  }
);

TodoListItemForm.displayName = 'TodoListItemForm';
export default TodoListItemForm;
