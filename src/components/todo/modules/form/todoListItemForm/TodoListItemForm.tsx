import React from 'react';
import styles from './TodoListItemForm.module.scss';
import { DatePicker, TextInput } from '../../../../uikit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteModal from '../../../../../components/uikit/modal/deleteModal/DeleteModal';

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
  datePickersClassName: string;
  handleDeleteTodoListItem?: () => void;
}

const TodoListItemForm = React.forwardRef(
  (props: TodoListItemFormProps, inputTodoRef: React.Ref<HTMLDivElement>) => {
    return (
      <div className={styles.wrapper} ref={inputTodoRef as React.RefObject<HTMLDivElement>}>
        <div className={styles.title}>
          <p className={styles.title__text}>{props.titleLabel}</p>
          <button className={styles.title__closeBtn} onClick={() => props.closeInputTodoForm()}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.items}>
          <div className={styles.textInput}>
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
          <div className={props.datePickersClassName}>
            <div>
              <DatePicker
                id={'date'}
                label={'実施日'}
                value={props.implementationDate}
                onChange={props.handleImplementationDate}
                required={true}
                disabled={false}
                minDate={new Date('1900-01-01')}
                onOpen={() =>
                  document.removeEventListener('click', props.onClickCloseInputTodoForm, {
                    capture: true,
                  })
                }
                onClose={() =>
                  document.addEventListener('click', props.onClickCloseInputTodoForm, {
                    capture: true,
                  })
                }
              />
            </div>
            <div>
              <DatePicker
                id={'date'}
                label={'締切日'}
                value={props.dueDate}
                onChange={props.handleDueDate}
                required={true}
                disabled={false}
                minDate={props.implementationDate}
                onOpen={() =>
                  document.removeEventListener('click', props.onClickCloseInputTodoForm, {
                    capture: true,
                  })
                }
                onClose={() =>
                  document.addEventListener('click', props.onClickCloseInputTodoForm, {
                    capture: true,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.btn}>
          <div>
            <button
              className={styles.btn__save}
              disabled={props.disabledButton}
              onClick={props.handleTodoListItem}
            >
              {props.buttonLabel}
            </button>
            <button
              className={styles.btn__cancel}
              disabled={false}
              onClick={() => {
                props.closeInputTodoForm();
                document.removeEventListener('click', props.onClickCloseInputTodoForm, {
                  capture: true,
                });
              }}
            >
              キャンセル
            </button>
          </div>
          {props.handleDeleteTodoListItem && (
            <DeleteModal
              title={'ToDoを削除'}
              buttonLabel={'削除'}
              disabled={false}
              contentName={props.todoContent}
              onClickDelete={props.handleDeleteTodoListItem}
              onClickCloseInputForm={props.onClickCloseInputTodoForm}
            />
          )}
        </div>
      </div>
    );
  }
);

TodoListItemForm.displayName = 'TodoListItemForm';
export default TodoListItemForm;
