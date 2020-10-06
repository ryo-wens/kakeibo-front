import React from 'react';
import 'date-fns';
import { TodoButton } from './index';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import { createTodoListItem } from '../../reducks/todoLists/operations';

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
  groupId: number;
  inputTodoContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonLabel: string;
  todoContent: string;
  selectedImplementationDate: Date | null;
  selectedDueDate: Date | null;
  inputImplementationDate: (date: Date | null) => void;
  inputDueDate: (date: Date | null) => void;
  closeInputTodoList: () => void;
}

const InputTodoList = (props: InputTodoListProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isBlankTodoContent = props.todoContent === '';

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
              onClick={() =>
                dispatch(
                  createTodoListItem(
                    props.selectedImplementationDate,
                    props.selectedDueDate,
                    props.todoContent
                  )
                ) && props.closeInputTodoList()
              }
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
