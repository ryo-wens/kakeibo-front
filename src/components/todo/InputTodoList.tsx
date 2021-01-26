import React, { useEffect } from 'react';
import 'date-fns';
import { deleteTodoListItem } from '../../reducks/todoList/operations';
import { deleteGroupTodoListItem } from '../../reducks/groupTodoList/operations';
import './input-todo-list.scss';
import { DatePicker, DeleteButton, TextInput } from '../uikit';
import { useLocation, useParams } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';

interface InputTodoListProps {
  buttonLabel: string;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputImplementationDate: (date: Date | null) => void;
  inputDueDate: (date: Date | null) => void;
  todoListItemId: number;
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  completeFlag: boolean;
  todoListItemOperation: () => void;
  disabledButton: boolean;
  closeInputTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
}

const InputTodoList = React.forwardRef(
  (props: InputTodoListProps, inputTodoRef: React.Ref<HTMLDivElement>) => {
    const entityType = useLocation().pathname.split('/')[1];
    const pathName = useLocation().pathname.split('/').slice(-1)[0];
    const { group_id } = useParams();

    useEffect(() => {
      document.addEventListener('click', props.onClickCloseInputTodoForm);
      return () => {
        document.removeEventListener('click', props.onClickCloseInputTodoForm);
      };
    }, [props.onClickCloseInputTodoForm]);

    return (
      <div
        className={pathName === 'home' ? 'input-todo-list--width' : 'input-todo-list'}
        ref={inputTodoRef as React.RefObject<HTMLDivElement>}
      >
        <div className="input-todo-list__title">
          <p className="input-todo-list__title--text">Todoを編集</p>
          <button
            className="input-todo-list__title--close-btn"
            onClick={() => props.closeInputTodoForm()}
          >
            <CloseIcon />
          </button>
        </div>

        <div
          className={
            pathName === 'home' ? 'input-todo-list__items--home-page' : 'input-todo-list__items'
          }
        >
          <div className="input-todo-list__text-input">
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
              pathName === 'home' ? 'input-todo-list__date--home-page' : 'input-todo-list__date'
            }
          >
            <div
              className={
                pathName === 'home'
                  ? 'input-todo-list__date-picker--home-page'
                  : 'input-todo-list__date-picker'
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
                pathName === 'home'
                  ? 'input-todo-list__date-picker--home-page'
                  : 'input-todo-list__date-picker'
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

        <div className="input-todo-list__btn">
          <div>
            <button
              className="input-todo-list__btn--save"
              disabled={props.disabledButton}
              onClick={props.todoListItemOperation}
            >
              {props.buttonLabel}
            </button>
            <button
              className="input-todo-list__btn--cancel"
              disabled={false}
              onClick={() => {
                props.closeInputTodoForm();
                document.removeEventListener('click', props.onClickCloseInputTodoForm);
              }}
            >
              キャンセル
            </button>
          </div>
          <DeleteButton
            buttonLabel={'削除'}
            disabled={false}
            contentName={props.todoContent}
            modalTitle={'Todo'}
            onClickDelete={
              entityType === 'group'
                ? deleteGroupTodoListItem(Number(group_id), props.todoListItemId)
                : deleteTodoListItem(props.todoListItemId)
            }
            onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
          />
        </div>
      </div>
    );
  }
);

InputTodoList.displayName = 'InputTodoList';
export default InputTodoList;
