import React from 'react';
import styles from './InputTaskNameForm.module.scss';
import { TextInput } from '../../../../uikit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteModal from '../../../../uikit/modal/deleteModal/DeleteModal';
import cn from 'classnames';

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
  formClassName?: string;
}

const InputTaskNameForm = React.forwardRef(
  (props: InputTaskNameFormProps, inputTaskRef: React.Ref<HTMLDivElement>) => {
    return (
      <div
        className={cn(styles.wrapper, props.formClassName)}
        ref={inputTaskRef as React.RefObject<HTMLDivElement>}
      >
        <div className={styles.title}>
          <p className={styles.title__text}>{props.titleLabel}</p>
          <button className={styles.title__closeBtn} onClick={props.handleCloseInputTaskForm}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.textInput}>
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
        <div className={styles.btn}>
          <div>
            <button
              className={styles.btn__add}
              disabled={props.disabledButton}
              onClick={props.handleTaskItem}
            >
              {props.buttonLabel}
            </button>
            <button className={styles.btn__cancel} onClick={props.handleCloseInputTaskForm}>
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
