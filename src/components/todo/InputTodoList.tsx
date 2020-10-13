import React from 'react';
import 'date-fns';
import { TodoButton } from './index';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import { editTodoListItem } from '../../reducks/todoLists/operations';
import { editGroupTodoListItem } from '../../reducks/groupTodoLists/operations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: {
      '& > *': {
        margin: theme.spacing(1),
        width: '600px',
      },
    },
    box: {
      width: '700px',
      borderColor: '#ccc',
    },
    inputTodoList: {
      margin: '10px',
    },
    buttons: {
      display: 'flex',
    },
  })
);

interface InputTodoListProps {
  buttonLabel: string;
  inputTodoContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputImplementationDate: (date: Date | null) => void;
  inputDueDate: (date: Date | null) => void;
  closeInputTodoList: () => void;
  todoListItemId: number;
  selectedImplementationDate: Date | null;
  selectedDueDate: Date | null;
  todoContent: string;
  completeFlag: boolean;
}

const InputTodoList = (props: InputTodoListProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isBlankTodoContent = props.todoContent === '';

  const pathName: string = window.location.pathname;
  const paths = pathName.split('/');
  const type = paths[1];
  const groupId = Number(paths[paths.length - 1]);

  const switchOperation = () => {
    if (type === ('todo' || 'schedule-todo')) {
      return dispatch(
        editTodoListItem(
          props.todoListItemId,
          props.selectedImplementationDate,
          props.selectedDueDate,
          props.todoContent,
          props.completeFlag
        )
      );
    } else if (type === 'group-todo') {
      return dispatch(
        editGroupTodoListItem(
          groupId,
          props.todoListItemId,
          props.selectedImplementationDate,
          props.selectedDueDate,
          props.todoContent,
          props.completeFlag
        )
      );
    }
  };

  return (
    <>
      <div className={classes.inputTodoList}>
        <form noValidate autoComplete="off">
          <Box border={1} className={classes.box}>
            <TextField
              className={classes.textarea}
              id="filled-basic"
              variant="outlined"
              type={'text'}
              value={props.todoContent}
              onChange={props.inputTodoContent}
            />
            <div className={classes.buttons} style={{ justifyContent: 'flex-end' }}>
              <TodoButton
                label={'画像をアップロード'}
                disabled={false}
                onClick={() => console.log('クリック')}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="実施日"
                  format="yyyy年 MM月dd日"
                  value={props.selectedImplementationDate}
                  onChange={props.inputImplementationDate}
                  minDate={new Date()}
                  required={true}
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
                />
              </MuiPickersUtilsProvider>
            </div>
          </Box>

          <div className={classes.buttons}>
            <TodoButton
              label={props.buttonLabel}
              disabled={isBlankTodoContent}
              onClick={() => switchOperation() && props.closeInputTodoList()}
            />
            <TodoButton
              label={'キャンセル'}
              disabled={false}
              onClick={() => props.closeInputTodoList()}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default InputTodoList;
