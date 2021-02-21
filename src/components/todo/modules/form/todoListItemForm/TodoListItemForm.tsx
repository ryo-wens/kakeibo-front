import React from 'react';
import './todo-list-item-form.scss';
import { DatePicker, TextInput } from '../../../../uikit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteModal from '../../../../uikit/modal/deleteModal/DeleteModal';

interface TodoListItemFormProps {
  titleLabel: string;
  buttonLabel: string;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImplementationDate: (date: Date | null) => void;
  handleDueDate: (date: Date | null) => void;
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  handleTodoListItem: () => void;
  disabledButton: boolean;
  closeInputTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  pathName: string;
  handleDeleteTodoListItem?: () => void;
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
                onChange={props.handleImplementationDate}
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
                onChange={props.handleDueDate}
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
              onClick={props.handleTodoListItem}
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
          {props.handleDeleteTodoListItem && (
            <DeleteModal
              title={'Todoを削除'}
              buttonLabel={'削除'}
              disabled={false}
              contentName={props.todoContent}
              onClickDelete={props.handleDeleteTodoListItem}
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
