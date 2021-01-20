import React, { useEffect } from 'react';
import 'date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import { deleteTodoListItem } from '../../reducks/todoList/operations';
import { deleteGroupTodoListItem } from '../../reducks/groupTodoList/operations';
import './input-todo-list.scss';
import { DeleteButton } from '../uikit';
import { useLocation, useParams } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import { Action, Dispatch } from 'redux';
import { State } from '../../reducks/store/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  })
);

interface InputTodoListProps {
  buttonLabel: string;
  inputTodoContent: (event: React.ChangeEvent<{ value: string }>) => void;
  inputImplementationDate: (date: Date | null) => void;
  inputDueDate: (date: Date | null) => void;
  closeInputTodoList: () => void;
  todoListItemId: number;
  selectedDate: Date | null;
  selectedImplementationDate: Date | null;
  selectedDueDate: Date | null;
  todoContent: string;
  completeFlag: boolean;
  onClickSave: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
  setOpenEditTodoList: React.Dispatch<React.SetStateAction<boolean>>;
  disabledSaveButton: boolean;
  onClickCloseInputTodoList: (event: Event) => void;
}

const InputTodoList = React.forwardRef(
  (props: InputTodoListProps, inputTodoRef: React.Ref<HTMLDivElement>) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const entityType = useLocation().pathname.split('/')[1];
    const pathName = useLocation().pathname.split('/').slice(-1)[0];
    const { group_id } = useParams();

    useEffect(() => {
      document.addEventListener('click', props.onClickCloseInputTodoList);
      return () => {
        document.removeEventListener('click', props.onClickCloseInputTodoList);
      };
    }, [props.onClickCloseInputTodoList]);

    return (
      <div className="input-todo-list" ref={inputTodoRef as React.RefObject<HTMLDivElement>}>
        <div className="input-todo-list__title">
          <p className="input-todo-list__title--text">Todoを編集</p>
          <button
            className="input-todo-list__title--close-btn"
            onClick={() => props.closeInputTodoList()}
          >
            <CloseIcon />
          </button>
        </div>
        <TextField
          className={classes.textarea}
          id="filled-basic"
          variant="outlined"
          type={'text'}
          value={props.todoContent}
          onChange={props.inputTodoContent}
        />
        <div
          className={
            pathName === '' || pathName === group_id
              ? 'input-todo-list__date--home'
              : 'input-todo-list__date'
          }
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="実施日"
              format="yyyy年 MM月dd日"
              value={props.selectedImplementationDate}
              onChange={props.inputImplementationDate}
              required={true}
              onOpen={() => document.removeEventListener('click', props.onClickCloseInputTodoList)}
              onClose={() => document.addEventListener('click', props.onClickCloseInputTodoList)}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="期限日"
              format="yyyy年 MM月dd日"
              value={props.selectedDueDate}
              onChange={props.inputDueDate}
              minDate={props.selectedImplementationDate}
              required={true}
              onOpen={() => document.removeEventListener('click', props.onClickCloseInputTodoList)}
              onClose={() => document.addEventListener('click', props.onClickCloseInputTodoList)}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className="input-todo-list__btn">
          <div>
            <button
              className="input-todo-list__btn--save"
              disabled={props.disabledSaveButton}
              onClick={() => {
                dispatch(props.onClickSave);
                props.setOpenEditTodoList(false);
              }}
            >
              {props.buttonLabel}
            </button>
            <button
              className="input-todo-list__btn--cancel"
              disabled={false}
              onClick={() => {
                props.closeInputTodoList();
                document.removeEventListener('click', props.onClickCloseInputTodoList);
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
            onClickCloseInputTodoList={props.onClickCloseInputTodoList}
          />
        </div>
      </div>
    );
    // };
  }
);

InputTodoList.displayName = 'InputTodoList';
export default InputTodoList;
